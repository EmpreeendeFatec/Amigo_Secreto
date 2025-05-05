'use server';//roda no lado do servidor

import { createClient } from "@/utils/supabase/server";
import { error } from "console";
import { redirect } from "next/navigation";
import { Resend } from "resend"; //importa a biblioteca de envio de email

export type CreateGroupState = {
    success: boolean | null;
    message?: string;
}

export async function createGroup(_previousState: CreateGroupState, formData: FormData) {

    const supabase = await createClient();

    const {data: authUser, error: authError} = await supabase.auth.getUser();

    if(authError){
        return {
            success: false,
            message: "Erro ao criar um grupo",
        }
    }

    const names = formData.getAll("name");
    const emails = formData.getAll("email");
    const groupName = formData.get("group-name");

    const {data: newGroup, error} = await supabase.from("groups").insert({
        name: groupName,
        owner_id: authUser.user.id,
    })

    .select ()
    .single();//retorna um único objeto

    if(error){
        return {
            success: false,
            message: "Erro ao criar um grupo",
        }
    }

   const participants = names.map((name, index) => ({
    group_id: newGroup.id,
    name,
    email: emails[index],
   }));

   const {data: createdParticipants, error: participantsError} = await supabase.from("participants").insert(participants)
   .select();

   if(participantsError){
    return {
        success: false,
        message: "Erro ao criar um grupo",
    }
   };

   const drawParticipants = drawGroup(createdParticipants);

   const {error: drawError} = await supabase.from("participants").upsert(drawParticipants); //Da um update no BD

   if(drawError){
    return {
        success: false,
        message: "Erro ao sortear os participantes",
    }
   };

   const {error: errorResend} = await sendEmailGroup(drawParticipants, groupName as string);//envia o email para os participantes
   
   if(errorResend){
    return {
        success: false,
        message: errorResend,
    }
   };

   redirect(`/apps/grupos/${newGroup.id}`); //redireciona para a página do grupo criado

}

   type Participant={
    id: string;
    group_id: string;
    name: string;
    email: string;
    assigned_to: string | null;
    created_at: string;
   }
   function drawGroup(participants: Participant[]){
    
    const selectedParticipants: string [] = [];

    return participants.map((participant) => { //não deixa as pessoas se repetirem

        const availableParticipants = participants.filter((p) => 
            p.id !== participant.id && !selectedParticipants.includes(p.id)
        );

        const assignedParticipant = availableParticipants[Math.floor(Math.random() * availableParticipants.length)];
        //sortea dentro do array avaliableParticipants uma pessoa aleatória

        selectedParticipants.push(assignedParticipant.id); //Seleciona a pessoa sorteada

        return{//devolvo o participante que ele retirou
            ...participant,
            assigned_to: assignedParticipant.id,
        };
    });
    
   }

   async function sendEmailGroup(participants: Participant[], groupName: string) {

    const resend = new Resend(process.env.RESEND_API_KEY); //chama a api do resend com a chave de autenticação
    
    try{
        
        await Promise.all(participants.map(participant => {
            resend.emails.send({
                from: "send@nexusjr.io",
                to: participant.email,
                subject: `Sorteio do amigo secreto - ${groupName}`,
                html: `<p>Olá ${participant.name}, você foi sorteado para o amigo secreto de ${groupName}.<br/><br/>
                 Você tirou <strong>${participants.find(p => p.id === participant.assigned_to)?.name}</strong></p>`,
            })
        }));
        return {error: null}; //se não der erro, retorna null
    }catch{
        return {
            error: "Erro ao enviar email",
        };
    }

   }

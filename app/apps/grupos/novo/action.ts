'use server';//roda no lado do servidor

import { createClient } from "@/utils/supabase/server";
import { group } from "console";

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

}
'use client'
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Trash2, Mail, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CreateGroupState } from "@/app/apps/grupos/novo/action";

interface Participant {
    name: string,
    email: string,
}

export default function NewGroupForm({ loggedUser }: { loggedUser: { email: string } }) {

    const {toast} = useToast();
    const [participants, setParticipants] = useState<Participant[]>([
        {
            name: "",
            email: loggedUser.email,
        }
    ])

    const [groupname, setGroupname] = useState("");

    const [state, formAction, pending] = useActionState<CreateGroupState, FormData>(createGroup{
        
        success: null,
        message: ""
    })
    

    function updateParticipant(index: number, field: keyof Participant, value: string) {
        const updateParticipants = [...participants];//gera uma cópia de participante

        updateParticipants[index][field] = value;//atualiza o valor do campo específico do participante
        setParticipants(updateParticipants);//repassa a lista atualizada de participantes
    }
    function removeParticipant(index: number) {
        setParticipants(participants.filter((_, i) => i !== index));
    }

    function addParticipant() {
        setParticipants(participants.concat ({ name: "", email: "" }));
    }

    useEffect(() => {
        if(state.success === false) {
            toast({
                variant: "destructive",
                description: state.message,
            });
        }
    }, [state]);

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Novo Grupo</CardTitle>
                <CardDescription>Convide seus amigos para participar do grupo</CardDescription>
            </CardHeader>
            <form action={formAction}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="group-name">Nome do Grupo:</label>
                        <Input
                            id="group-name"
                            name="group-name"
                            value={groupname}
                            onChange={(e) => setGroupname(e.target.value)}
                            placeholder="Digite o nome do grupo"
                            required
                            className="mt-3"
                        />
                    </div>
                    <h2 className="!mt-12">Participantes:</h2>
                    {participants.map((participant, index) => (
                        <div key={index} className="flex flex-col md:flex-row items-end space-y-4 md:space-y-0 md:space-x-4">
                            <div className="flex-grow space-y-2 w-full">
                                <label htmlFor={`name-${index}`}>Nome:</label>
                                <Input
                                    id={`name-${index}`}
                                    name="name"
                                    value={participant.name}
                                    onChange={(e) => updateParticipant(index, "name", e.target.value)}
                                    placeholder="Digite o nome da pessoa"
                                    className="readonly:text-muted-foreground mt-3"
                                    required
                                />
                            </div>

                            <div className="flex-grow space-y-2 w-full">
                                <label htmlFor={`email-${index}`}>Email:</label>
                                <Input
                                    id={`email-${index}`}
                                    name="email"
                                    type="email"
                                    value={participant.email}
                                    onChange={(e) => updateParticipant(index, "email", e.target.value)}
                                    placeholder="Digite o email da pessoa"
                                    className="readonly:text-muted-foreground mt-3"
                                    readOnly={participant.email === loggedUser.email}
                                    required
                                />
                            </div>

                            <div className="min-w-9">
                                {participants.length > 1 && participant.email !== loggedUser.email && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={() => removeParticipant(index)}
                                    >
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}
                </CardContent>
                <Separator className="my-4"/>
                <CardFooter className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
                    <Button 
                    type="button"
                    variant="outline"
                    onClick={addParticipant}
                    className="w-full md:w-auto hover:bg-gray-700 cursor-pointer">
                        Adicionar um amigo
                    </Button>
                    <Button 
                    type="submit"
                    className="w-full md:w-auto flex items-center space-x-2 bg-red-700 hover:bg-red-800 text-white cursor-pointer">
                        <Mail className="w-3 h-3"/> Criar grupo e enviar os emails
                        {pending && <Loader className="animate-spin"/>}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}
'use client'
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Participant {
    name: string,
    email: string,
}

export default function NewGroupForm({ loggedUser }: { loggedUser: { email: string } }) {

    const [participants, setParticipants] = useState<Participant[]>([
        {
            name: "",
            email: loggedUser.email,
        }
    ])

    const [groupname, setGroupname] = useState("");

    function updateParticipants(index: number, field: keyof Participant, value: string) {
        const updateParticipants = [...participants];

        updateParticipants[index][field] = value;
        setParticipants(updateParticipants);
    }
    function removeParticipant(index: number) {
        setParticipants(participants.filter((_, i) => i !== index));
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Novo Grupo</CardTitle>
                <CardDescription>Convide seus amigos para participar do grupo</CardDescription>
            </CardHeader>
            <form action="">
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="group-name">Nome do Grupo:</label>
                        <input
                            className="ml-10"
                            id="group-name"
                            name="group-name"
                            value={groupname}
                            onChange={(e) => setGroupname(e.target.value)}
                            placeholder="Digite o nome do grupo"
                            required
                        />
                    </div>
                    <h2 className="!mt-12">Participantes:</h2>
                    {participants.map((participant, index) => (
                        <div key={index} className="flex flex-col md:flex-row items-end space-y-4 md:space-y-0 md:space-x-4">
                            <div className="flex-grow space-y-2 w-full">
                                <label htmlFor={`name-${index}`}>Nome:</label>
                                <input
                                    id={`name-${index}`}
                                    name="name"
                                    value={participant.name}
                                    onChange={(e) => updateParticipants(index, "name", e.target.value)}
                                    placeholder="Digite o nome da pessoa"
                                    className="readonly:text-muted-foreground ml-4"
                                    required
                                />
                            </div>

                            <div className="flex-grow space-y-2 w-full">
                                <label htmlFor={`email-${index}`}>Email:</label>
                                <input
                                    id={`email-${index}`}
                                    name="email"
                                    type="email"
                                    value={participant.email}
                                    onChange={(e) => updateParticipants(index, "email", e.target.value)}
                                    placeholder="Digite o email da pessoa"
                                    className="readonly:text-muted-foreground ml-4"
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
            </form>
        </Card>
    )
}
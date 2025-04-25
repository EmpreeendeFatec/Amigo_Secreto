'use client'
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface Participant{
    name: string,
    email: string,
}

export default function NewGroupForm({loggedUser} : {loggedUser: {email: string}}) {

    const [participants, setParticipants] = useState<Participant[]>([
        {
            name: "",
            email: loggedUser.email,
        }
    ])

    const [groupname, setGroupname] = useState("");

    return(
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Novo Grupo</CardTitle>
                    <CardDescription>Convide seus amigos para participar do grupo</CardDescription>
            </CardHeader>
        </Card>
    )
}
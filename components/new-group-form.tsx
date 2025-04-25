'use client'
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

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
            <form action="">
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>

                        </Label>
                    </div>
                </CardContent>
            </form>
        </Card>
    )
}
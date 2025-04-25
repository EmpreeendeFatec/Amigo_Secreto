'use client'
import { useState } from "react";

interface Participant{
    name: string,
    email: string,
}

export default function NewGroupForm({loggedUser} : {loggedUser: {email: string}}) {

    const [participants, setParticipants] = useState([
        {
            name: "",
            email: loggedUser.email,
        }
    ])

}
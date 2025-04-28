'use server';//roda no lado do servidor

import { createClient } from "@/utils/supabase/server";

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

    console.log(names, emails, groupName);

}
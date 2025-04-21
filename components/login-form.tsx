"use client";

import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function LoginForm(){
    return(
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl"> Login</CardTitle>
                <CardDescription>Digite seu email para receber um link de login</CardDescription>
            </CardHeader>
            <CardContent>
                <form action="">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" name="email" placeholder="maria@gmail.com" required/>

                        <Button type="submit" className="w-full">Login</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
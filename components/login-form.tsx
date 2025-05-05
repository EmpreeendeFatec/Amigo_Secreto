"use client";

import { useActionState } from "react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { login, LoginState } from "@/app/(auth)/login/actions";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Loader, MessageCircle } from "lucide-react";

export default function LoginForm() {
    
    const [state, formAction, pending] = useActionState<LoginState, FormData>(
        login,
        {
            success: null,
            message: ""
        }
    );

    // Estado para gerenciar o banner de cookies
    const [showCookieBanner, setShowCookieBanner] = useState(false);

    useEffect(() => {
        // Verifica se o consentimento já foi dado
        const consent = localStorage.getItem("cookieConsent");
        if (!consent) {
            setShowCookieBanner(true);
        }
    }, []);

    const handleAcceptCookies = () => {
        // Salva o consentimento no localStorage
        localStorage.setItem("cookieConsent", "true");
        setShowCookieBanner(false);
    };

    const handleRejectCookies = () => {
        // Salva o consentimento no localStorage
        localStorage.setItem("cookieConsent", "false");
        setShowCookieBanner(false);
    }

    return (
        <>
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>Digite seu email para receber um link de login</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction}>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" name="email" placeholder="maria@gmail.com" required />

                            {state.success === true && (
                                <Alert className="text-muted-foreground">
                                    <MessageCircle className="h-4 w-4 !text-green-600" />
                                    <AlertTitle className="text-gray-50">Email enviado!</AlertTitle>
                                    <AlertDescription>Confira seu inbox para acessar o link de login</AlertDescription>
                                </Alert>
                            )}
                            {state.success === false && (
                                <Alert className="text-muted-foreground">
                                    <MessageCircle className="h-4 w-4 !text-red-600" />
                                    <AlertTitle className="text-gray-50">Erro!</AlertTitle>
                                    <AlertDescription>Ocorreu um erro ao enviar o link de login. Entre em contato com o suporte!</AlertDescription>
                                </Alert>
                            )}

                            <Button type="submit" className="w-full">
                                {pending && <Loader className="animate-spin" />}
                                Login
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Banner de Cookies */}
            {showCookieBanner && (
                <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 flex justify-between items-center">
                    <span>Este site usa cookies para melhorar sua experiência.</span>
                    <div className="justi flex gap-2">
                    <button
                        onClick={handleAcceptCookies}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                        Aceitar todos os cookies
                    </button>
                    <button 
                    onClick={handleRejectCookies}
                    className="bg-red-500 text-white px-4 py-2 rounded">
                        Recusar todos os cookies
                    </button>
                        </div>
                </div>
            )}
        </>
    );
}
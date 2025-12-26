import { useState } from "react";
import { supabase } from "@/supabase/supabase.config";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

import {
    Loader2,
    Mail,
    Lock,
    UtensilsCrossed,
} from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (submitting) return;

        setSubmitting(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError("Correo o contraseña incorrectos");
            setSubmitting(false);
            return;
        }

        // ❗ NO NAVEGUES AQUÍ
        // PublicRoute se encargará automáticamente
    };

    return (
        <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2">
            {/* LEFT */}
            <div className="hidden md:flex flex-col justify-between p-10 bg-linear-to-br from-zinc-900 to-zinc-800 text-white">
                <div className="flex items-center gap-3 text-2xl font-semibold">
                    <UtensilsCrossed className="h-7 w-7" />
                    Restaurante App
                </div>

                <div className="space-y-4 max-w-md">
                    <h1 className="text-4xl font-bold">
                        Control total de tu restaurante
                    </h1>
                    <p className="text-zinc-300">
                        Gestiona pedidos, mesas, pagos y turnos desde un solo lugar.
                    </p>
                </div>

                <p className="text-sm text-zinc-400">
                    © {new Date().getFullYear()} Restaurante App
                </p>
            </div>

            {/* RIGHT */}
            <div className="flex items-center justify-center p-6">
                <Card className="w-full max-w-md border-none shadow-none">
                    <CardContent className="p-8 space-y-8">
                        <div className="text-center space-y-2">
                            <div className="mx-auto w-fit rounded-full bg-zinc-900 p-3 text-white">
                                <UtensilsCrossed className="h-6 w-6" />
                            </div>
                            <h2 className="text-2xl font-semibold">Bienvenido</h2>
                            <p className="text-sm text-muted-foreground">
                                Ingresa tus credenciales
                            </p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="email"
                                    placeholder="correo@ejemplo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={submitting}
                                    className="pl-10 h-11"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="password"
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={submitting}
                                    className="pl-10 h-11"
                                    required
                                />
                            </div>

                            {error && (
                                <div className="text-sm text-red-600 text-center">
                                    {error}
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full h-11 bg-zinc-900"
                                disabled={submitting}
                            >
                                {submitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Ingresando...
                                    </>
                                ) : (
                                    "Ingresar al sistema"
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

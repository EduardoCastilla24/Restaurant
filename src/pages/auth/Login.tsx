import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/AuthStore";
import { Loader2 } from "lucide-react"; // Icono de carga
import { getErrorMessage } from "@/utils/errorUtils";

export default function Login() {
    // 1. Obtenemos las funciones del store
    const { signInWithEmail } = useAuthStore();

    // 2. Estados locales para el formulario
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 3. Manejador para Email/Password
    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await signInWithEmail(email, password);
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };


    return (
        <main className="bg-slate-50 h-screen w-screen flex items-center justify-center">
            <section className="w-11/12 md:w-100 p-6 md:p-8 rounded-lg shadow-md flex flex-col gap-6 border text-sm bg-white">

                {/* Encabezado */}
                <div className="flex flex-col gap-1 justify-between w-full items-center text-center">
                    <h1 className="text-3xl font-bold text-primary">Restaurante POS</h1>
                    <p className="text-gray-500 text-sm">Sistema de Gestión de Pedidos</p>
                </div>

                {/* Mensaje de Error */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-xs">
                        {error}
                    </div>
                )}

                {/* Formulario Email/Pass */}
                <form onSubmit={handleEmailLogin} className="flex flex-col gap-4">
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            placeholder="admin@restaurante.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="password">Contraseña</Label>
                        <Input
                            type="password"
                            id="password"
                            placeholder="******"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>

                    <Button type="submit" className="w-full mt-2" disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {loading ? "Ingresando..." : "Iniciar Sesión"}
                    </Button>
                </form>
            </section>
        </main>
    );
}
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
    const navigate = useNavigate();

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center gap-4 bg-slate-50">
            <h1 className="text-4xl font-bold text-red-500">Acceso Denegado</h1>
            <p className="text-gray-600">
                No tienes permisos para ver esta página o tu perfil no se ha cargado correctamente.
            </p>
            <div className="flex gap-4">
                <Button onClick={() => navigate(-1)} variant="outline">
                    Volver atrás
                </Button>
            </div>
        </div>
    );
}
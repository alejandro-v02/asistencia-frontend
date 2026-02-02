import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Loader2, LockKeyhole } from "lucide-react"; // Importamos LockKeyhole
import Input from "../atoms/InputLogin";
import Button from "../atoms/Button";

export default function LoginForm() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const loginMutation = useMutation({
        mutationFn: async () => {
            const res = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ login, password }),
            });
        
            if (!res.ok) throw new Error("Credenciales incorrectas");
        
            const data = await res.json();
        
            Cookies.set("token", data.token, { expires: 1 });
            Cookies.set("nombre", data.usuario.persona, { expires: 1 });
            Cookies.set("rol", data.usuario.rol, { expires: 1 });
        
            return data.usuario.rol; // 👈 IMPORTANTE
        },
        onSuccess: (rol) => {
            if (rol === "ADMINISTRADOR") {
                navigate("/dashboard");
            } else if (rol === "INSTRUCTOR") {
                navigate("/dashboard-instructor");
            } else if (rol === "APRENDIZ") {
                navigate("/dashboard-aprendiz");
            } else {
                navigate("/");
            }
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginMutation.mutate();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-12 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-gray-100 space-y-6"
            >
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl mb-4">
                        <LockKeyhole size={32} />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
                        Login de Sesión
                    </h1>
                    <div className="w-12 h-1 bg-blue-600 mx-auto mt-2 rounded-full opacity-20"></div>
                </div>

                <div className="space-y-4">
                    <Input
                        type="text"
                        placeholder="Usuario"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />

                    <Input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="pt-4">
                    <Button 
                        disabled={loginMutation.isPending}
                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-100 transition-all flex items-center justify-center"
                    >
                        {loginMutation.isPending ? (
                            <Loader2 className="animate-spin" size={24} />
                        ) : (
                            "Entrar"
                        )}
                    </Button>
                </div>

                {loginMutation.isError && (
                    <p className="text-red-500 text-sm text-center font-medium animate-pulse">
                        {(loginMutation.error as Error).message}
                    </p>
                )}

                {loginMutation.isSuccess && (
                    <p className="text-green-600 text-sm text-center font-medium">
                        Login exitoso
                    </p>
                )}
            </form>
        </div>
    );
}
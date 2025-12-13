import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
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

    return "Login Exitoso";
    },
    onSuccess: () => navigate("/dashboard")
});

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate();
};

return (
    <form
    onSubmit={handleSubmit}
    className="bg-black p-8 rounded-2xl shadow-md w-70 h-[400px] space-y-4"
    >
    <h1 className="text-xl font-sans text-white text-center mb-10">Login de Sesion</h1>

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

    <Button>Entrar</Button>

    {loginMutation.isError && (
        <p className="text-red-500 text-sm text-center">
        {(loginMutation.error as Error).message}
        </p>
    )}

    {loginMutation.isSuccess && (
        <p className="text-green-600 text-sm text-center">
        Login exitoso
        </p>
    )}
    </form>
);
}

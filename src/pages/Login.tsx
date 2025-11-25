import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: async () => {

      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          login: login,
          password: password
        }),
      });

      if (!res.ok) {
        throw new Error("Credenciales incorrectas");
      }

      const data = await res.json();

      Cookies.set("token", data.token, { expires: 1 });

      return "Login Exitoso";
    },

    onSuccess: () => {
      navigate("/dashboard");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-80 space-y-4"
      >
        <h1 className="text-xl font-bold text-center">Login</h1>

        <input
          type="text"
          placeholder="Usuario"
          className="w-full border p-2 rounded"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Entrar
        </button>
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
    </div>
  );
}

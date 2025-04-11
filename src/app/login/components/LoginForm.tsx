"use client";
import { login } from "@/actions/auth";
import { useState } from "react";

export default function LoginForm() {

  const [form, setForm] = useState<{ username: string, password: string }>({ username: "", password: "" })
  const [error, setError] = useState("")
  const handleInputChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }
  const handleSubmit = async () => {
    const result = await login(form)
    if (result.error) {
      setError(result.error)
    }
  }
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit()
    }}>
      <input className="border border-gray-400 rounded p-1 mr-2" value={form?.username} onChange={(e) => handleInputChange("username", e.target.value)} type="string" placeholder="username" name="username" />
      <input className="border border-gray-400 rounded p-1 mr-2" value={form?.password} onChange={(e) => handleInputChange("password", e.target.value)} type="password" placeholder="password" name="password" />
      <button className="cursor-pointer">Login</button>
      {error && <p className="text-red-500 text-sm leading-4">{error}</p>}
    </form>
  );
}

"use client";
import { login } from "@/actions/auth";
import { Button, Field, Label } from "@headlessui/react";
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
      <Field>
        <Label className="w-52">
          Username
        </Label>
        <div>
          <input className="border border-gray-400 rounded p-1 mr-2" value={form?.username} onChange={(e) => handleInputChange("username", e.target.value)} type="string" placeholder="username" name="username" />
        </div>
      </Field>
      <Field className="mt-4">
        <Label>
          Password
        </Label>
        <div>
          <input className="border border-gray-400 rounded p-1 mr-2" value={form?.password} onChange={(e) => handleInputChange("password", e.target.value)} type="password" placeholder="password" name="password" />
        </div>
      </Field>
      <Button type="submit" className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-xl mt-4">Login</Button>
      {error && <p className="text-red-500 text-sm leading-4">{error}</p>}
    </form>
  );
}

"use client";
import { login } from "@/actions/auth";
import { Button, Field, Label } from "@headlessui/react";
import Image from "next/image";
import { useState } from "react";

export default function LoginForm() {
  const [isLoggingIn, setIsLoggingIn] = useState(false)
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

    <div className="relative w-screen h-screen">
      {/* Background image */}
      <Image
        src="/image0.jpg"
        alt="login background image"
        fill
        priority
      />
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit()
      }}>
        {/* <Field> */}
        {/*   <Label className="w-52"> */}
        {/*     Username */}
        {/*   </Label> */}
        {/*   <div> */}
        {/*     <input className="border border-gray-400 rounded p-1 mr-2" value={form?.username} onChange={(e) => handleInputChange("username", e.target.value)} type="string" placeholder="username" name="username" /> */}
        {/*   </div> */}
        {/* </Field> */}
        {/* <Field className="mt-4"> */}
        {/*   <Label> */}
        {/*     Password */}
        {/*   </Label> */}
        {/*   <div> */}
        {/*     <input className="border border-gray-400 rounded p-1 mr-2" value={form?.password} onChange={(e) => handleInputChange("password", e.target.value)} type="password" placeholder="password" name="password" /> */}
        {/*   </div> */}
        {/* </Field> */}
        {/* <Button type="submit" className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-xl mt-4">Login</Button> */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="min-w-96 bg-[#3a3a3a] border-[3px] border-black px-10 py-8 rounded-4xl shadow-[inset_0_0_8px_#000]">
            <h1 className="text-yellow-400 text-lg font-bold mb-6 leading-tight">
              Welcome to the<br />Honeycomb Hunt
            </h1>
            {isLoggingIn ? (
              <>
                <Field>
                  <Label className='text-yellow-400'>Username</Label>
                  <div className='px-2 py-2 bg-[#2e2e2e] text-white border-2 border-black shadow hover:bg-[#444] transition'>
                    <input></input>
                  </div>
                </Field>

                <Field>
                  <Label className='text-yellow-400'>Password</Label>
                  <div className='px-2 py-2 bg-[#2e2e2e] text-white border-2 border-black shadow hover:bg-[#444] transition'>
                    <input></input>
                  </div>
                </Field>
                <div className="mt-6 flex">
                  <Button onClick={() => setIsLoggingIn(false)} type="button" className="flex-1 mr-4 cursor-pointer px-10 py-2 bg-[#2e2e2e] text-white border-2 border-black shadow hover:bg-[#444] transition">Cancel</Button>
                  <Button type="submit" className="flex-1 cursor-pointer px-10 py-2 bg-[#2e2e2e] text-white border-2 border-black shadow hover:bg-[#444] transition">Login</Button>
                </div>
                {error && <p className="text-red-500 text-sm leading-4">{error}</p>}
              </>
            ) :
              <div className="flex gap-6 justify-center">
                <button onClick={() => setIsLoggingIn(true)} className="cursor-pointer px-10 py-2 bg-[#2e2e2e] text-white border-2 border-black shadow hover:bg-[#444] transition">
                  Login
                </button>
                <button className="cursor-pointer px-10 py-2 bg-[#2e2e2e] text-white border-2 border-black shadow hover:bg-[#444] transition">
                  Rules
                </button>
              </div>
            }
          </div>
        </div>
      </form>
    </div>
  );
}

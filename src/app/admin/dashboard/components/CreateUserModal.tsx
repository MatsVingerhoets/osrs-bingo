'use client'

import { postUser } from "@/actions/users";
import GenericModal from "@/components/GenericModal"
import SpinnerIcon from "@/components/icons/SpinnerIcon";
import { Button, Field, Label } from "@headlessui/react";
import { useState } from "react"
import { z } from 'zod';

type Props = {
  toggle: () => void
}
const createUserSchema = z.object({
  username: z.string().min(2, "name must be longer than 2"),
  password: z.string().min(8, "password must be longer than 8")
});

const CreateTeamModal = ({ toggle }: Props) => {
  const [errors, setErrors] = useState<{ username?: string, password?: string }>()
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState({
    username: "",
    password: ""
  })

  const handleSubmit = async () => {
    setLoading(true)
    const result = createUserSchema.safeParse(userData);
    if (!result.success) {
      const formattedErrors = result.error.flatten().fieldErrors;
      setErrors({
        username: formattedErrors.username?.[0] || "",
        password: formattedErrors.password?.[0] || ""
      })
      return
    }

    try {
      await postUser(userData)
      setLoading(false);
      toggle()
    } catch (e) {
      console.log(e)
      setLoading(false);
      toggle();
    }
  }
  const handleInputChange = (field: string, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }))
  }
  return (
    <GenericModal title="Add a team" onClose={toggle}>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit()
      }}>
        <div className="flex justify-between">
          <Field>
            <Label className="font-bold text-base">Username</Label>
            <div>
              <input
                className="border border-gray-400 rounded p-1 mr-2"
                value={userData?.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                type="string"
                placeholder="username"
                name="username"
              />
            </div>
          </Field>
          {errors?.username && <p className="text-red-500 text-sm leading-4">{errors?.username}</p>}
          <Field>
            <Label className="font-bold text-base">Password</Label>
            <div>
              <input
                className="border border-gray-400 rounded p-1 mr-2"
                value={userData?.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                type="password"
                placeholder="password"
                name="password"
              />
            </div>
            {errors?.password && <p className="text-red-500 text-sm leading-4">{errors?.password}</p>}
          </Field>
        </div>
        <div className="mt-4">
          <Button type='submit' className="flex items-center px-4 py-2 bg-blue-700 text-white rounded-xl cursor-pointer">
            {loading && <SpinnerIcon />}
            <span>Add a user</span>
          </Button>
        </div>
      </form>
    </GenericModal>
  )
}
export default CreateTeamModal

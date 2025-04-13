'use client'

import { postTeam } from "@/actions/teams";
import GenericModal from "@/components/GenericModal"
import SpinnerIcon from "@/components/icons/SpinnerIcon";
import { Button } from "@headlessui/react";
import { useState } from "react"
import { z } from 'zod';

type Props = {
  toggle: () => void
}
const createTeamSchema = z.object({
  name: z.string().min(2, "name must be longer than 2")
});

const CreateTeamModal = ({ toggle }: Props) => {
  const [errors, setErrors] = useState({ name: "" })
  const [loading, setLoading] = useState(false)
  const [teamData, setTeamData] = useState({
    name: ""
  })

  const handleSubmit = async () => {
    setLoading(true)
    const result = createTeamSchema.safeParse(teamData);

    console.log(result)
    if (!result.success) {
      const formattedErrors = result.error.flatten().fieldErrors;
      setErrors({ name: formattedErrors.name?.[0] || "" })
    }
    if (!result.data) {
      setErrors({ name: "something went wrong" })
      return
    }

    try {
      await postTeam(result.data.name)
      setLoading(false);
      toggle()
    } catch (e) {
      console.log(e)
      setLoading(false);
      toggle();
    }
  }
  const handleInputChange = (value: string) => {
    setTeamData({ name: value })
  }
  return (
    <GenericModal title="Add a team" onClose={toggle}>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit()
      }}>
        <input
          className="border border-gray-400 rounded p-1 mr-2"
          value={teamData?.name}
          onChange={(e) => handleInputChange(e.target.value)}
          type="string"
          placeholder="name"
          name="name"
        />
        {errors.name && <p className="text-red-500 text-sm leading-4">{errors.name}</p>}
        <div className="mt-4">
          <Button type='submit' className="flex items-center px-4 py-2 bg-blue-700 text-white rounded-xl cursor-pointer">
            {loading && <SpinnerIcon />}
            <span>Add team</span>
          </Button>
        </div>
      </form>
    </GenericModal>
  )
}
export default CreateTeamModal

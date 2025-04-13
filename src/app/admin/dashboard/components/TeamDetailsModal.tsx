'use client'

import { assignUserToTeam } from "@/actions/teams";
import GenericModal from "@/components/GenericModal"
import SpinnerIcon from "@/components/icons/SpinnerIcon";
import { Team } from "@/models/Team";
import { User } from "@/models/User";
import { Button, Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { useState } from "react"
import { MdOutlineArrowDownward } from "react-icons/md";

type Props = {
  toggle: () => void
  team: Team
  users: Omit<User, 'password'>[]
}

const CreateTeamModal = ({ toggle, team, users }: Props) => {
  const [loading, setLoading] = useState(false)
  const teamUsers = users.filter(user => user.team_id === team.id)
  const filteredUsers = users.filter(user => user.team_id !== team.id)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const handleAddUser = async () => {
    setLoading(true)
    try {
      if (!selectedUser) return
      await assignUserToTeam(selectedUser.id, team.id)
      console.log("User assigned!")
      setLoading(false)
    } catch (e) {
      console.error("Could not assign user to team", e)
      setLoading(false)
    }
  }

  return (
    <GenericModal title={team.name} onClose={toggle}>
      <div className="flex">
        <div className="flex-1 mr-4">
          <Listbox value={selectedUser} onChange={setSelectedUser}>
            <ListboxButton className="w-full mb-1 border border-gray-300 rounded px-3 py-2 text-left flex justify-between items-center">
              <span>{selectedUser ? selectedUser.username : "Select a user"}</span>
              <MdOutlineArrowDownward className="ml-2 text-gray-500" />
            </ListboxButton>
            <ListboxOptions className="border border-gray-300 rounded shadow bg-white max-h-60 overflow-auto">
              {filteredUsers.map(user => (
                <ListboxOption
                  key={user.id}
                  value={user}
                  className={({ active }) =>
                    `px-4 py-2 cursor-pointer ${active ? 'bg-blue-100' : ''}`
                  }
                >
                  {user.username}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Listbox>
        </div>
        <Button onClick={handleAddUser} className='h-fit cursor-pointer rounded-xl px-4 py-2 w-fit bg-blue-600 text-white'>
          {loading && <SpinnerIcon />}
          <span>Add a user</span>
        </Button>
      </div>
      <div>
        <h2>Users from this team:</h2>
        {teamUsers.map(user => (
          <div key={user.id}>{user.username}</div>
        ))}
      </div>
    </GenericModal>
  )
}
export default CreateTeamModal

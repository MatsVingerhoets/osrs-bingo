'use client'

import { assignBoardToTeam, assignUserToTeam } from "@/actions/teams";
import GenericModal from "@/components/GenericModal"
import SpinnerIcon from "@/components/icons/SpinnerIcon";
import { Board } from "@/models/Board";
import { Team } from "@/models/Team";
import { User } from "@/models/User";
import { Button, Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { useState } from "react"
import { MdOutlineArrowDownward } from "react-icons/md";

type Props = {
  toggle: () => void
  team: Team
  users: Omit<User, 'password'>[]
  boards: Board[]
}

const CreateTeamModal = ({ toggle, team, users, boards }: Props) => {
  const [loading, setLoading] = useState(false)
  const teamUsers = users.filter(user => user.team_id === team.id)
  const filteredUsers = users.filter(user => user.team_id !== team.id)
  const [selectedUsers, setSelectedUsers] = useState<User[] | null>(null)
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null)
  const handleSubmit = async () => {
    setLoading(true)
    try {
      if (!selectedBoard) return
      if (!selectedUsers) return
      await assignBoardToTeam(selectedBoard.id, team.id)
      for (const user of selectedUsers) {
        await assignUserToTeam(user.id, team.id)
      }
      setLoading(false)
    } catch (e) {
      console.error("Could not assign user to team", e)
      setLoading(false)
    }
  }
  return (
    <GenericModal title={team.name} onClose={toggle}>
      {/* user selection */}
      <div className="flex">
        <div className="flex-1 mr-4">
          <Listbox value={selectedUsers} onChange={setSelectedUsers} multiple>
            <ListboxButton className="w-full mb-1 border border-gray-300 rounded px-3 py-2 text-left flex justify-between items-center">
              {(selectedUsers && selectedUsers.length > 0) ? selectedUsers.map(user => (
                <span key={user.id}>{user.username}</span>
              )) : (
                <span>{"Select a user"}</span>
              )
              }
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
      </div>
      {/* board selection */}
      <div className="flex">
        <div className="flex-1 mr-4">
          <Listbox value={selectedBoard} onChange={setSelectedBoard}>
            <ListboxButton className="w-full mb-1 border border-gray-300 rounded px-3 py-2 text-left flex justify-between items-center">
              <span>{selectedBoard ? selectedBoard.name : "Select a board"}</span>
              <MdOutlineArrowDownward className="ml-2 text-gray-500" />
            </ListboxButton>
            <ListboxOptions className="border border-gray-300 rounded shadow bg-white max-h-60 overflow-auto">
              {boards.map(board => (
                <ListboxOption
                  key={board.id}
                  value={board}
                  className={({ active }) =>
                    `px-4 py-2 cursor-pointer ${active ? 'bg-blue-100' : ''}`
                  }
                >
                  {board.name}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Listbox>
        </div>
      </div>
      <Button onClick={handleSubmit} className='h-fit cursor-pointer rounded-xl px-4 py-2 w-fit bg-blue-600 text-white'>
        {loading && <SpinnerIcon />}
        <span>Submit</span>
      </Button>
      <div>
        <h2>Selected Board:</h2>
        {boards.find(board => board.id === team.board_id)?.name || ''}
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

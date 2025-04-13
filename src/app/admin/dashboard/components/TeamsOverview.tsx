'use client'

import { Button } from "@headlessui/react"
import { Team } from "@/models/Team"
import { useState } from "react"
import CreateTeamModal from "./CreateTeamModal"
import TeamDetailsModal from "./TeamDetailsModal"
import { User } from "@/models/User"

type Props = {
  teams: Team[]
  users: Omit<User, 'password'>[]
}
const TeamsOverview = ({ teams, users }: Props) => {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  const [createTeamModalOpen, setCreateTeamModalOpen] = useState(false)
  const toggleCreateTeamModal = () => setCreateTeamModalOpen((prev) => !prev);
  const [teamDetailModalOpen, setTeamDetailModalOpen] = useState(false)
  const toggleTeamDetailModal = () => setTeamDetailModalOpen((prev) => !prev);

  const handleTeamClick = (team: Team) => {
    setSelectedTeam(team)
    setTeamDetailModalOpen(true)
  }
  return (
    <div className="w-full rounded bg-white p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl text-blue-900 font-bold">Teams</h2>
        <Button onClick={toggleCreateTeamModal} className="px-4 py-2 bg-blue-700 text-white rounded-xl cursor-pointer">Add team</Button>
      </div>
      {teams.map(team => (
        <div key={team.id}>
          <Button className="px-4 py-2 mb-2 rounded bg-gray-100 hover:bg-gray-200 cursor-pointer" onClick={() => handleTeamClick(team)}>
            {team.name}
          </Button>
        </div>
      )
      )}
      {createTeamModalOpen && (
        <CreateTeamModal toggle={toggleCreateTeamModal} />
      )}
      {teamDetailModalOpen && selectedTeam && (
        <TeamDetailsModal users={users} team={selectedTeam} toggle={toggleTeamDetailModal} />
      )}
    </div>
  )
}
export default TeamsOverview

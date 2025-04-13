import { Team } from "@/models/Team"

type Props = {
  team: Team
}
const TeamStats = ({ team }: Props) => {
  return (
    <div className="w-[400px]">
      <div className="border-8 border-green-700 h-[600px] bg-green-500 p-6 flex items-center flex-col">
        <h2 className="font-bold text-2xl">{team.name}</h2>
      </div>
    </div>
  )
}

export default TeamStats

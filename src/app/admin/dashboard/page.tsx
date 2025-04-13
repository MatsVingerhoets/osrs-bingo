import { getSession } from "@/actions/auth";
import { redirect } from "next/navigation"
import TeamsOverview from "./components/TeamsOverview";
import { getTeams } from "@/actions/teams";
import Navigation from "@/components/navigation/Navigation";
import UsersOverview from "./components/UsersOverview";
import { getUsers } from "@/actions/users";

const DashboardPage = async () => {
  const session = await getSession();

  if (!session || session.user?.role !== 'ADMIN') {
    redirect('/forbidden')
  }

  const teams = await getTeams()
  const users = await getUsers()
  return (
    <>
      <Navigation user={session.user} />
      <div className="container p-10 flex items-center flex-col gap-6">
        <TeamsOverview users={users} teams={teams} />
        <UsersOverview users={users} />
      </div>
    </ >
  )
}

export default DashboardPage

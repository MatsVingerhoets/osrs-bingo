import { getSession } from "@/actions/auth";
import { getTeamById } from "@/actions/teams";
import { getUserById } from "@/actions/users";
import Board from "@/components/Board";
import Navigation from "@/components/navigation/Navigation";
import TeamStats from "@/components/TeamStats";
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getSession();
  const user = session?.user;
  if (!user) {
    redirect('/login');
  }
  const dbUser = await getUserById(user.id);
  if (!dbUser) {
    redirect('/login');
  }
  const team = user.team_id ? await getTeamById(user.team_id) : null
  return (
    <div className="flex justify-center flex-col h-full">
      <Navigation user={dbUser} />
      {user.team_id ? (
        <div className="flex p-10 h-full">
          <Board />
          {team && <TeamStats team={team} />}
        </div>
      ) : (
        <div className="flex justify-center mt-4">
          You are currently not yet assigned to a team, get in contact with the admin if this is wrong
        </div>
      )}
    </div>
  );
}

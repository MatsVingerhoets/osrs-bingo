import { getSession } from "@/actions/auth";
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
  return (
    <div className="flex justify-center flex-col h-full">
      <Navigation user={user} />
      {user.team_id ? (
        <div className="flex p-10 h-full">
          <Board />
          <TeamStats />
        </div>
      ) : (
        <div>
          You are currently not yet assigned to a team, get in contact with the admin if this is wrong
        </div>
      )}

    </div>
  );
}

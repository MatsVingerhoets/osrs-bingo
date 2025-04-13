import { getSession } from "@/actions/auth";
import Board from "@/components/Board";
import Navigation from "@/components/navigation/Navigation";
import TeamStats from "@/components/TeamStats";
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getSession();
  const user = session?.user;
  if (!session?.user) {
    redirect('/login');
  }
  return (
    <div className="flex justify-center flex-col h-full">
      <Navigation user={user} />
      <div className="flex p-10 h-full">
        <Board />
        <TeamStats />
      </div>
    </div>
  );
}

import { getSession } from "@/actions/auth";
import { redirect } from 'next/navigation';
import LogoutForm from "./LogoutForm";

export default async function Home() {
  const session = await getSession();

  if (!session?.user) {
    redirect('/login');
  }
  return (
    <div className="flex justify-center flex-col">
      <h1>YOU HAVE BEEN LOGGED IN</h1>

      <LogoutForm />
    </div>
  );
}

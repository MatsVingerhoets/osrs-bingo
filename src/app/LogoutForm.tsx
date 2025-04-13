import { logout } from "@/actions/auth";

export default function LogoutForm() {
  return (
    <form action={logout}>
      <button className="block p-2 rounded cursor-pointer">Logout</button>
    </form>
  );
}

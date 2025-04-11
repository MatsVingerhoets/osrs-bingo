import { logout } from "@/actions/auth";

export default function LogoutForm() {
  return (
    <form action={logout}>
      <button className="border border-gray-400 rounded p-1 cursor-pointer">Logout</button>
    </form>
  );
}

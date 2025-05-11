import { User } from "@/models/User";
import UserDropDown from "./UserDropdown";

type Props = {
  user: Omit<User, 'password'>
}
const NavLinks = ({ user }: Props) => {
  return (
    <div className="flex items-center">
      <ul className="flex flex-col items-center mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
        <li className="block px-5 py-2">
          <UserDropDown user={user} />
        </li>
      </ul>
    </div>
  );
}
export default NavLinks

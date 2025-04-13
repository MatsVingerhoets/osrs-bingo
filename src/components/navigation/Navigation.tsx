'use client'

import { User } from "@/models/User"
import NavLinks from "./NavLinks"

type Props = {
  user: Omit<User, 'password'>
}
const Navigation = ({ user }: Props) => {
  return (
    <nav className="bg-white">
      <div className="container py-3 mx-auto flex justify-end items-center">
        <NavLinks user={user} />
      </div>
    </nav>
  )
}
export default Navigation

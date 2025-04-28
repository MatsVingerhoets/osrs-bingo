'use client'

import { Button } from "@headlessui/react"
import { useState } from "react"
import { User } from "@/models/User"
import CreateUserModal from "./CreateUserModal"

type Props = {
  users: Omit<User, "password">[]
}
const UsersOverview = ({ users }: Props) => {
  const [userModalOpen, setUserModalOpen] = useState(false)
  const toggleUserModal = () => setUserModalOpen((prev) => !prev);
  return (
    <div className="w-full rounded bg-white p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl text-blue-900 font-bold">Users</h2>
        <Button onClick={toggleUserModal} className="px-4 py-2 bg-blue-700 text-white rounded-xl cursor-pointer">Add user</Button>
      </div>
      {users.map(user => (
        <div key={user.id}>
          {user.username}
        </div>
      )
      )}
      {userModalOpen && (
        <CreateUserModal toggle={toggleUserModal} />
      )}
    </div>
  )
}
export default UsersOverview

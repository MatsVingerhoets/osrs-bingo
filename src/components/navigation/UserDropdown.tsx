import React from 'react';
import { Popover, PopoverButton, PopoverBackdrop, PopoverPanel, Transition } from '@headlessui/react';
import LogoutForm from '@/app/LogoutForm';
import Link from 'next/link';
import { User } from '@/models/User';

type Props = {
  user: Omit<User, 'password'>
}
const UserDropDown = ({ user }: Props) => {
  return (
    <Popover className="relative">
      <>
        <PopoverButton className="cursor-pointer">
          {user.username}
        </PopoverButton>
        <PopoverBackdrop className="fixed inset-0 " />
        <Transition
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <PopoverPanel anchor="bottom end" className="flex flex-col mt-3 divide-y divide-dashed bg-white">
            <LogoutForm />
            {user.role === "ADMIN" && <Link href='/admin/dashboard' className='p-2'>Admin</Link>}
          </PopoverPanel>
        </Transition>
      </>
    </Popover>
  );
}

export default UserDropDown;

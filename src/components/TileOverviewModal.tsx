'use client'

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import { MdClose } from "react-icons/md"

type Props = {
  onClose: () => void
  title: string
  completedAt: Date | null
  completedBy: string | null
  points: number
}
const TileOverviewModal = ({ points, completedBy, completedAt, onClose, title }: Props) => {
  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 flex items-center w-screen justify-center p-4 bg-gray-800/[var(--bg-opacity)] [--bg-opacity:25%]">
        <DialogPanel className="w-[752px] max-h-[90vh] space-y-6 bg-white overflow-y-auto p-6 rounded-lg">
          <DialogTitle className="font-bold flex items-center justify-between text-xl">
            {title}
            <MdClose className="hover:cursor-pointer w-6 hover:bg-gray-100 rounded-full" onClick={onClose} />
          </DialogTitle>
          <p>{`Completed by ${completedBy} giving ${points} point(s)`}</p>
          <p>{`at ${completedAt}`}</p>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default TileOverviewModal

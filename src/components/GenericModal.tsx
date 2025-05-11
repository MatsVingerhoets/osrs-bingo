import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import { ReactNode } from "react"
import { MdClose } from "react-icons/md"

type Props = {
  onClose: () => void
  title: string
  children: ReactNode
  buttonsLeft?: ReactNode;
  buttonsRight?: ReactNode;
}
const GenericModal = ({ onClose, title, children, buttonsRight, buttonsLeft }: Props) => {
  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 flex items-center w-screen justify-center p-4 bg-gray-800/[var(--bg-opacity)] [--bg-opacity:25%]">
        <DialogPanel className="w-[752px] max-h-[90vh] space-y-6 bg-white overflow-y-auto p-6 rounded-lg">
          <DialogTitle className="font-bold flex items-center justify-between text-xl">
            {title}
            <MdClose className="hover:cursor-pointer w-6" onClick={onClose} />
          </DialogTitle>
          {children && children}
          {buttonsLeft ||
            (buttonsRight && (
              <div className="flex items-center">
                {buttonsLeft && <div className="flex gap-4">{buttonsLeft}</div>}
                {buttonsRight && <div className="flex gap-4 ml-auto">{buttonsRight}</div>}
              </div>
            ))}
        </DialogPanel>
      </div>
    </Dialog>
  )
}
export default GenericModal

'use client'

import { Button, Dialog, DialogPanel, DialogTitle, Field, Input, Label } from "@headlessui/react"
import { Dispatch, SetStateAction, useState } from "react"
import { MdClose } from "react-icons/md"
import { User } from "@/models/User"
import { postTileCompletion } from "@/actions/tile"
import { updateTileVisibility } from "@/app/util"
import { RowConfigWithHidden } from "./types"

type Props = {
  onClose: () => void
  title: string
  setBoardConfig: Dispatch<SetStateAction<RowConfigWithHidden[]>>
  tileId: number
  user: Omit<User, 'password'>
  points: number
}
const TileModal = ({ points, user, tileId, setBoardConfig, onClose, title }: Props) => {
  const [formValues, setFormValues] = useState({ link: "" })
  const handleFormChange = (field: string, value: string) => {
    setFormValues(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    setBoardConfig(prevBoard => {
      // Mark the selected tile as completed
      const updatedBoard = prevBoard.map(row => ({
        ...row,
        tiles: row.tiles.map(tile =>
          tile.tile_id === tileId ? { ...tile, completed: true } : tile
        ),
      }));

      // Update visibility based on completed tiles
      return updateTileVisibility(updatedBoard);
    });

    await postTileCompletion({ proof: formValues.link, user_id: user.id, tile_id: tileId });
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 flex items-center w-screen justify-center p-4 bg-gray-800/[var(--bg-opacity)] [--bg-opacity:25%]">
        <DialogPanel className="w-[752px] max-h-[90vh] space-y-6 bg-white overflow-y-auto p-6 rounded-lg">
          <DialogTitle className="font-bold flex items-center justify-between text-xl">
            {title}
            <MdClose className="hover:cursor-pointer w-6 hover:bg-gray-100 rounded-full" onClick={onClose} />
          </DialogTitle>
          <p className="font-semibold mb-4">This is worth {points} point(s)</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}>
            <Field>
              <Label className="font-bold text-sm">Add a link for proof *</Label>
              <div>
                <Input
                  className='mb-4 rounded-lg p-2 border border-gray-300 data-[invalid]:!border-red-500 w-full disabled:bg-gray-100 disabled:text-gray-400'
                  required={true} value={formValues.link} onChange={(e) => handleFormChange("link", e.currentTarget.value)} />
              </div>
            </Field>
            <div className="flex justify-end">
              <Button className='cursor-pointer bg-green-600 p-2 rounded text-white' type="submit">Mark Tile as done</Button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default TileModal

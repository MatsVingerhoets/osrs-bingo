'use client'

import { Button, Dialog, DialogPanel, DialogTitle, Field, Input, Label } from "@headlessui/react"
import { Dispatch, SetStateAction, useState } from "react"
import { MdClose } from "react-icons/md"
import { BoardConfig } from "./types"

type Props = {
  onClose: () => void
  title: string
  setBoardConfig: Dispatch<SetStateAction<BoardConfig>>
  tileId: number
}
const TileModal = ({ tileId, setBoardConfig, onClose, title }: Props) => {
  const [formValues, setFormValues] = useState({ link: "" })
  const handleFormChange = (field: string, value: string) => {
    setFormValues(prev => ({ ...prev, [field]: value }))
  }
  const handleSubmit = () => {
    setBoardConfig((prevBoard) =>
      prevBoard.map((row) => ({
        ...row,
        tiles: row.tiles.map((tile) => {
          // Reveal adjacent tiles
          const isAdjacentToClicked = prevBoard.some((r) =>
            r.tiles.some(
              (t) =>
                t.id === tileId &&
                t.adjacentTiles.includes(tile.id)
            )
          );

          // Complete the clicked tile
          if (tile.id === tileId) {
            return { ...tile, completed: true };
          }

          if (isAdjacentToClicked) {
            return { ...tile, hidden: false };
          }

          return tile;
        }),
      }))
    );
    onClose()
  }
  //TODO: show who completed it if it is already completed
  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 flex items-center w-screen justify-center p-4 bg-gray-800/[var(--bg-opacity)] [--bg-opacity:25%]">
        <DialogPanel className="w-[752px] max-h-[90vh] space-y-6 bg-white overflow-y-auto p-6 rounded-lg">
          <DialogTitle className="font-bold flex items-center justify-between text-xl">
            {title}
            <MdClose className="hover:cursor-pointer w-6 hover:bg-gray-100 rounded-full" onClick={onClose} />
          </DialogTitle>
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

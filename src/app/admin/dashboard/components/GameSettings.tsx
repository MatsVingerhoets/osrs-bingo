'use client'

import { createBoard, createTiles } from "@/actions/game"
import { Button } from "@headlessui/react"

const GameSettings = () => {
  const handleCreateBoard = async () => {
    const result = await createBoard()
    console.log(result)
  }
  const handleCreateTiles = async () => {
    const result = await createTiles()
    console.log(result)
  }
  return (
    <div className="w-full rounded bg-white p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl text-blue-900 font-bold">Game</h2>
        <Button onClick={handleCreateBoard} className="px-4 py-2 bg-blue-700 text-white rounded-xl cursor-pointer">Create board</Button>
        <Button onClick={handleCreateTiles} className="px-4 py-2 bg-blue-700 text-white rounded-xl cursor-pointer">Create tiles</Button>
      </div>
    </div>
  )
}
export default GameSettings 

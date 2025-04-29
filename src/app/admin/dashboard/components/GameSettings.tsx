'use client'

import { createGame } from "@/actions/game"
import { Button } from "@headlessui/react"

const GameSettings = () => {
  const handleClick = async () => {
    try {
      await createGame()
      console.log("success")
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div className="w-full rounded bg-white p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl text-blue-900 font-bold">Game</h2>
        <Button onClick={handleClick} className="px-4 py-2 bg-blue-700 text-white rounded-xl cursor-pointer">Start Game</Button>
      </div>

    </div>
  )
}
export default GameSettings 

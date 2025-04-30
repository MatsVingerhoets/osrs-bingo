'use client'

import { createBoard, createTiles } from "@/actions/game"
import { Button } from "@headlessui/react"
import { useState } from "react"

const GameSettings = () => {
  const [showAlert, setShowAlert] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState<null | string>(null)
  const handleSubmit = async () => {
    const boardResult = await createBoard()
    const tilesResult = await createTiles()
    if (boardResult.error || tilesResult.error) {
      setShowErrorAlert(
        `boardResult: ${boardResult.error}, tilesResult: ${tilesResult.error}`
      );
    } else {

      setShowAlert(true)
    }
  }
  return (
    <div className="w-full rounded bg-white p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl text-blue-900 font-bold">Game</h2>
        <Button onClick={handleSubmit} className="px-4 py-2 bg-blue-700 text-white rounded-xl cursor-pointer">Generate Game</Button>
      </div>
      {showAlert && (
        <div className="w-full bg-green-50 p-2 rounded-xl mt-2 border border-green-600 text-green-600">
          Succes
        </div>
      )}
      {showErrorAlert && (
        <div className="w-full bg-red-50 p-2 rounded-xl mt-2 border border-red-600 text-red-600">
          {showErrorAlert}
        </div>
      )
      }
    </div>
  )
}
export default GameSettings 

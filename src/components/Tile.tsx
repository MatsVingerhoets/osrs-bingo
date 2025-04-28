'use client'

import Image from 'next/image';
import { TILESIZE } from './config';
import clsx from 'clsx';
import TileModal from './TileModal';
import { Dispatch, SetStateAction, useState } from 'react';
import { BoardConfig } from './types';
import { MdCheckCircleOutline } from 'react-icons/md';

type Props = {
  id: number;
  value: number;
  color: string
  url: string
  hidden: boolean
  label: string
  setBoardConfig: Dispatch<SetStateAction<BoardConfig>>
  completed: boolean
}

const Tile = ({ completed, id, setBoardConfig, value, color, url, hidden, label }: Props) => {
  const [modalOpen, setModalOpen] = useState(false)
  // use supabase triggers to open tiles when completing one
  const handleClick = () => {
    if (hidden || completed) return
    setModalOpen(true)
  }

  return (
    <>
      <div
        onClick={handleClick}
        className={clsx(color, hidden ? "cursor-default" : "cursor-pointer", "relative flex items-center justify-center")}
        key={id}
        style={{
          width: TILESIZE,
          height: TILESIZE,
          clipPath:
            "polygon(0% 25%, 50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%)",
        }}
      >
        {completed && <MdCheckCircleOutline size={56} className='text-green-800 absolute z-10' />}
        <span className={clsx(completed && 'opacity-50', 'flex items-center justify-center')}>{!hidden ? <Image width={30} height={30} src={url} alt={`Image of ${value}`} /> : value}</span>
      </div >
      {modalOpen && <TileModal tileId={id} setBoardConfig={setBoardConfig} title={label} onClose={() => setModalOpen(false)} />}
    </>
  );
};

export default Tile;


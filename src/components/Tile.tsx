'use client'

import Image from 'next/image';
import { TILESIZE } from './config';
import clsx from 'clsx';
import TileModal from './TileModal';
import { Dispatch, SetStateAction, useState } from 'react';
import { MdCheckCircleOutline } from 'react-icons/md';
import { User } from '@/models/User';
import TileOverviewModal from './TileOverviewModal';
import { RowConfigWithHidden } from './types';

type Props = {
  id: number;
  color: string
  url: string
  hidden: boolean
  label: string
  setBoardConfig: Dispatch<SetStateAction<RowConfigWithHidden[]>>
  completed: boolean
  user: Omit<User, 'password'>
  completedBy: string | null
  completedAt: Date | null
  points: number
}

const Tile = ({ points, completedBy, user, completed, id, setBoardConfig, color, url, hidden, label, completedAt }: Props) => {
  const [completeTileModalOpen, setCompleteTileModalOpen] = useState(false)
  const [overviewModalOpen, setOverviewModalOpen] = useState(false)
  const handleClick = () => {
    if (hidden || completed) return
    setCompleteTileModalOpen(true)
  }
  const handleOverviewClick = () => {
    if (hidden) return
    setOverviewModalOpen(true)
  }
  return (
    <>
      <div
        onClick={completed ? handleOverviewClick : handleClick}
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
        <span className={clsx(completed && 'opacity-50', 'flex items-center justify-center')}>
          {!hidden ? <Image width={30} height={30} src={url} alt={`Image of ${label}`} /> : ''}
        </span>
      </div >
      {(completeTileModalOpen && !completed) && (
        <TileModal
          user={user}
          tileId={id}
          setBoardConfig={setBoardConfig}
          title={label}
          onClose={() => setCompleteTileModalOpen(false)}
          points={points}
        />
      )}
      {(overviewModalOpen && completed) && (
        <TileOverviewModal
          points={points}
          completedBy={completedBy}
          onClose={() => setOverviewModalOpen(false)}
          completedAt={completedAt}
          title={label}
        />
      )}
    </>
  );
};

export default Tile;


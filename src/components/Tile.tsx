import { TILESIZE } from './config';
import clsx from 'clsx';

type Props = {
  id: number;
  value: number;
  color: string
}

const Tile = ({ id, value, color }: Props) => {
  return (
    <div
      className={clsx(color, "flex items-center justify-center")}
      key={id}
      style={{
        width: TILESIZE,
        height: TILESIZE,
        clipPath:
          "polygon(0% 25%, 50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%)",
      }}
    >
      <span className='flex items-center justify-center'>{value}</span>
    </div >
  );
};

export default Tile;


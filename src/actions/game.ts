'use server'

import { tiles } from "@/data/tiles";
import db from "@/lib/db";

export async function createBoard() {
  try {
    const initialBoardConfig = [
      { rowIndex: 0, tiles: [1, 2, 3, 4, 5, 6], shift: 6 },
      { rowIndex: 1, tiles: [7, 8, 9, 10, 11, 12, 13], shift: 5 },
      { rowIndex: 2, tiles: [14, 15, 16, 17, 18, 19, 20, 21], shift: 4 },
      { rowIndex: 3, tiles: [22, 23, 24, 25, 26, 27, 28, 29, 30], shift: 3 },
      { rowIndex: 4, tiles: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40], shift: 2 },
      { rowIndex: 5, tiles: [41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51], shift: 1 },
      { rowIndex: 6, tiles: [52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63], shift: 0 },
      { rowIndex: 7, tiles: [64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74], shift: 1 },
      { rowIndex: 8, tiles: [75, 76, 77, 78, 79, 80, 81, 82, 83, 84], shift: 2 },
      { rowIndex: 9, tiles: [85, 86, 87, 88, 89, 90, 91, 92, 93], shift: 3 },
      { rowIndex: 10, tiles: [94, 95, 96, 97, 98, 99, 100, 101], shift: 4 },
      { rowIndex: 11, tiles: [102, 103, 104, 105, 106, 107, 108], shift: 5 },
    ]
    await db.insertInto('boards').values({ name: "KnS", config: initialBoardConfig }).execute();
    return 'success'
  } catch (e) {
    return e
  }
}
export async function createTiles() {
  try {
    // Map tiles into the format your DB expects
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const insertableTiles = tiles.map(({ adjacentTiles, hidden, id, ...rest }) => ({
      ...rest,
      adjacent_tiles: adjacentTiles,
      board_id: 1,
    }));

    // Insert in batches of 25
    const BATCH_SIZE = 25;
    for (let i = 0; i < insertableTiles.length; i += BATCH_SIZE) {
      const batch = insertableTiles.slice(i, i + BATCH_SIZE);
      await db.insertInto("tiles").values(batch).execute();
      console.log(`Inserted batch ${i / BATCH_SIZE + 1}`);
    }

    return "success";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.error("Insert error:", e);
    return e.message;
  }
}

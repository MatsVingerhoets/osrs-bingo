import db from '../../src/lib/db';
import { tiles } from '../tiles';

async function insertTiles() {
  try {
    // Loop through each tile and insert into the database
    for (const tile of tiles) {
      const { adjacentTiles, ...rest } = tile
      await db.insertInto('tiles').values({ ...rest, adjacent_tiles: adjacentTiles, board_id: 1 }).execute();
      console.log(`Inserted tile: ${tile.id}`);
    }
    console.log('Board inserted successfully.');
  } catch (error) {
    console.error('Error inserting tiles:', error);
  } finally {
    await db.destroy(); // Close the connection after the operation
  }
}

insertTiles();


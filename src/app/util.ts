
import { RowConfig } from "@/components/types";

export const updateTileVisibility = (boardConfig: RowConfig[]) => {
  const alwaysVisible = new Set([46, 57, 58]);

  // Collect completed tile IDs
  const completedTileIds = new Set<number>();
  boardConfig.forEach(row => {
    row.tiles.forEach(tile => {
      if (tile.completed) {
        completedTileIds.add(tile.tile_id);
      }
    });
  });

  // Flatten all tiles for easier global lookup
  const allTiles = boardConfig.flatMap(row => row.tiles);
  const tileMap = new Map(allTiles.map(tile => [tile.tile_id, tile]));

  return boardConfig.map(row => ({
    ...row,
    tiles: row.tiles.map(tile => {
      if (tile.completed || alwaysVisible.has(tile.tile_id)) {
        return { ...tile, hidden: false };
      }

      // Check if this tile is adjacent to a completed tile (reverse logic)
      const isAdjacentToCompleted = [...completedTileIds].some(completedId => {
        const completedTile = tileMap.get(completedId);
        return completedTile?.adjacent_tiles.includes(tile.tile_id);
      });

      return { ...tile, hidden: !isAdjacentToCompleted };
    }),
  }));
};


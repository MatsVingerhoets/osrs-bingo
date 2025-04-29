import { RowConfig } from "@/components/types";

export const updateTileVisibility = (boardConfig: RowConfig[]) => {
  const alwaysVisible = new Set([46, 57, 58]); // Tiles that are always visible

  // Step 1: Collect IDs of completed tiles
  const completedTileIds = new Set<number>();
  boardConfig.forEach(row => {
    row.tiles.forEach(tile => {
      if (tile.completed) {
        completedTileIds.add(tile.tile_id);
      }
    });
  });

  // Step 2: Update hidden status based on adjacent tiles
  return boardConfig.map(row => ({
    ...row,
    tiles: row.tiles.map(tile => {
      if (tile.completed || alwaysVisible.has(tile.tile_id)) {
        return { ...tile, hidden: false };
      }

      const shouldReveal = tile.adjacent_tiles.some(adjId => completedTileIds.has(adjId));
      return { ...tile, hidden: !shouldReveal };
    }),
  }));
};


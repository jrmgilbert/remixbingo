import { db } from "~/utils/db.server";
import { shuffle } from "~/lib/utils";

export async function getGrids() {
  return await db.grid.findMany();
}

export async function getGridsWithItems() {
  return await db.grid.findMany({
    include: { gridItems: true },
  });
}

export async function getGrid(id: string) {
  return await db.grid.findUniqueOrThrow({ where: { id } });
}

export async function getGridWithItems(id: string) {
  const grid = await db.grid.findUnique({
    where: { id },
    include: { gridItems: { include: { item: true } } },
  });

  if (!grid) return null;

  grid.gridItems.sort((a, b) => a.position - b.position);

  return grid;
}

export async function createGrid(username: string, seed: string = "") {
  const grid = await db.grid.create({
    data: { username },
  });

  const allItems = await db.item.findMany();

  const mandatoryItems = allItems.filter((i) => i.category == 0);
  const otherItems = shuffle(allItems.filter((i) => i.category > 0)).slice(0, 25 - mandatoryItems.length);

  const gridItems = shuffle([...mandatoryItems, ...otherItems]);

  let currentPosition = 0;

  for (const gridItem of gridItems) {
    await db.gridItem.create({
      data: {
        gridId: grid.id,
        itemId: gridItem.id,
        position: currentPosition,
      },
    });

    currentPosition++;
  }

  return await db.grid.findUniqueOrThrow({ where: { id: grid.id } });
}

export async function checkGridItem(gridId: string, itemId: string, check: boolean) {
  const gridItem = await db.gridItem.update({
    where: { gridId_itemId: { gridId, itemId } },
    data: {
      isChecked: check,
      checkedAt: check ? new Date() : null,
    },
  });

  return gridItem;
}

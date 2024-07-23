import { db } from "~/utils/db.server";

export async function getItems() {
  return db.item.findMany();
}

export async function getItem(id: string) {
  return db.item.findUnique({ where: { id } });
}

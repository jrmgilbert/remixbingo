import { ActionFunctionArgs, json } from "@remix-run/node";
import { checkGridItem } from "~/models/grids.server";

export type CheckActionReturnType = ReturnType<typeof action>;

export const action = async ({ params, request }: ActionFunctionArgs) => {
  if (request.method.toLowerCase() != "post") {
    return json({ gridItem: null }, 400);
  }

  try {
    const formData = await request.formData();

    const gridId = params.gridId as string;
    const itemId = params.itemId as string;

    const check = formData.get("check") == "true";

    const gridItem = await checkGridItem(gridId, itemId, check);

    return json({ gridItem }, 200);
  } catch {
    return json({ gridItem: null }, 400);
  }
};

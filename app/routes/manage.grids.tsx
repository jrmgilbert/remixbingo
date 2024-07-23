import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getGridsWithItems } from "~/models/grids.server";
import { Button } from "~/components/ui/button";
import { Progress } from "~/components/ui/progress";
import { useToast } from "~/components/ui/use-toast";

export const loader = async ({}: LoaderFunctionArgs) => {
  const grids = await getGridsWithItems();

  return json({ grids });
};

export default function ManageItemsRoute() {
  const { grids } = useLoaderData<typeof loader>();
  const { toast } = useToast();

  return (
    <div>
      <h2 className="font-bold text-xl my-2">Grids</h2>
      <hr className="my-2" />
      <div className="flex flex-col items-stretch gap-y-6">
        {grids.map((grid) => {
          const completed = grid.gridItems.filter((i) => i.isChecked).length;
          const total = grid.gridItems.length;

          return (
            <div key={grid.id} className="mb-6">
              <div className="flex flex-row items-center">
                <div className="h-8 w-8 mr-2 rounded-full self-end -mt-1 text-slate-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </div>
                <Link to={`/grid/${grid.id}`}>
                  <span className="font-bold text-xl">{grid.username}</span>
                  <span className="text-sm text-muted-foreground ml-1 font-regular">{`(${completed}/${total})`}</span>
                </Link>
                <div className="ml-auto text-sm font-mono">{grid.id}</div>
                <Button
                  variant="outline"
                  size="icon"
                  className="self-end ml-2 h-8 w-8 p-2"
                  onClick={() => {
                    // TODO Get current hsotname
                    navigator.clipboard.writeText(`/grid/${grid.id}`);
                    toast({ description: "✔️ Link copied to clipboard." });
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-copy"
                  >
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                </Button>
              </div>
              <div className="mt-1">
                <Progress className="h-2" value={(completed / total) * 100} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

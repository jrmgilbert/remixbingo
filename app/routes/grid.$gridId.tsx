import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useParams, useSearchParams } from "@remix-run/react";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { getGridWithItems } from "~/models/grids.server";

import { Button } from "~/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/components/ui/collapsible";
import { Item } from "~/components/item";

const possibleBingosIndices = [
  // Rows
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24],

  // Columns
  [0, 5, 10, 15, 20],
  [1, 6, 11, 16, 21],
  [2, 7, 12, 17, 22],
  [3, 8, 13, 18, 23],
  [4, 9, 14, 19, 24],

  // Diagonals
  [0, 6, 12, 18, 24],
  [4, 8, 12, 16, 20],
];

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const gridId = params.gridId as string;

  if (!gridId) {
    throw new Response("Not Found", { status: 404 });
  }

  const grid = await getGridWithItems(gridId);

  if (!grid) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ grid });
};

export default function GridRoute() {
  const { grid } = useLoaderData<typeof loader>();

  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [hasBingo, setHasBingo] = useState(false);
  const [blinkingItemIndices, setBlinkingItemIndices] = useState<number[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const params = useParams();

  useEffect(() => {
    const isNewGrid = searchParams.has("new");

    if (isNewGrid && params.gridId) {
      window.localStorage.setItem("gridId", params.gridId);
      setSearchParams({});
    }
  }, []);

  useEffect(() => {
    setHasBingo(false);
    let blinkingItems: number[] = [];
    const checkedItems = grid.gridItems.map((i) => i.isChecked);

    for (const possibleCombination of possibleBingosIndices) {
      let isBingo = true;

      for (const itemIndex of possibleCombination) {
        if (!checkedItems[itemIndex]) {
          isBingo = false;
        }
      }

      if (isBingo) {
        if (!hasBingo) setHasBingo(true);
        blinkingItems = blinkingItems.concat(possibleCombination);
      }
    }
    setBlinkingItemIndices([...new Set(blinkingItems)].sort());
    //  setHasBingo(blinkingItemIndices.length > 0);
  }, [grid]);

  return (
    <div>
      <div className="my-6 flex flex-row items-baseline flex-nowrap">
        <div className="h-8 w-8 mr-2 rounded-full self-end -mt-1 text-slate-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </div>
        <div className="font-bold text-2xl">{grid.username}</div>
        <div className="ml-auto text-sm font-mono">{grid.id}</div>
      </div>

      <div>
        <div className="grid grid-cols-5 border items-stretch">
          {grid.gridItems.map((gridItem, index) => {
            return (
              <Item
                key={gridItem.itemId}
                gridId={gridItem.gridId}
                itemId={gridItem.itemId}
                category={gridItem.item.category}
                emoji={gridItem.item.emoji}
                title={gridItem.item.title}
                description={gridItem.item.description}
                isChecked={gridItem.isChecked}
                isPartOfBingo={blinkingItemIndices.includes(index)}
              />
            );
          })}
        </div>
      </div>

      {hasBingo && <div className="text-center text-4xl font-bold my-4">BINGO !</div>}

      <div className="my-8">
        <Collapsible open={isSummaryOpen} onOpenChange={setIsSummaryOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full flex flex-row flex-nowrap items-baseline justify-start">
              <div className="font-bold">Summary of challenges</div>
              <div className="ml-auto">{isSummaryOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}</div>
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent asChild>
            <div className="p-2 flex flex-col items-stretch gap-y-1">
              {grid.gridItems.map((gridItem) => {
                return (
                  <div key={gridItem.itemId}>
                    <div className="flex flex-row items-baseline">
                      <div className="text-xl w-10">{gridItem.item.emoji}</div>
                      <div className="font-medium text-sm">{gridItem.item.title}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}

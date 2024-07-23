import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { cn } from "~/lib/utils";
import { CheckActionReturnType } from "~/routes/grid.$gridId.item.$itemId.mark";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "~/components/ui/drawer";
import { Button } from "~/components/ui/button";

interface ItemProps {
  gridId: string;
  itemId: string;
  category?: number;
  emoji: string;
  title: string;
  description: string;
  isChecked: boolean;
  isPartOfBingo?: boolean;
}

export const Item = ({ gridId, itemId, category, emoji, title, description, isChecked, isPartOfBingo }: ItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExplodingConfetti, setIsExplodingConfetti] = useState(false);

  const fetcher = useFetcher<CheckActionReturnType>();

  const isDone = fetcher.formData ? fetcher.formData.get("check") === "true" : isChecked;

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data?.gridItem?.isChecked) {
      // setIsOpen(false);
      setIsExplodingConfetti(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsExplodingConfetti(false);
      }, 1500);
    }
  }, [fetcher]);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger>
        <div
          className={cn(
            "relative aspect-square bg-muted",
            {
              "bg-green-600 border-green-700": isChecked,
            },
            {
              "border-2 border-accent": category === 0,
            },
            {
              border: !category || category > 0,
            }
          )}
        >
          {isChecked && isPartOfBingo && <div className="blinking absolute w-full h-full bg-green-400 z-20"></div>}
          <div className="absolute w-full h-full flex items-center justify-center text-3xl z-30">{emoji}</div>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle asChild>
            <div>
              <div className="text-4xl text-center mb-8">{emoji}</div>
              {title}
              {isExplodingConfetti && <ConfettiExplosion zIndex={100} />}
            </div>
          </DrawerTitle>
          <DrawerDescription asChild>
            <div>
              <p className="">{description}</p>

              {isChecked && (
                <p className="mt-12 text-lg text-neutral-950">
                  <span className="text-green-700 font-bold text-xl mr-2">✓</span>
                  {"Well done!"}
                </p>
              )}
            </div>
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          {isDone && (
            <div>
              <fetcher.Form method="post" action={`/grid/${gridId}/item/${itemId}/mark`} className="w-full">
                <input type="hidden" name="check" value="false" />
                <Button variant="outline" className="w-full border-red-700">
                  {"Cancel"}
                </Button>
              </fetcher.Form>
            </div>
          )}
          {!isDone && (
            <fetcher.Form method="post" action={`/grid/${gridId}/item/${itemId}/mark`} className="w-full">
              <input type="hidden" name="check" value="true" />
              <Button variant="default" className="bg-green-600 w-full">
                {"✓ It's done"}
              </Button>
            </fetcher.Form>
          )}
          <DrawerClose asChild>
            <Button variant="outline" className="w-full my-4">
              Go back
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Item;

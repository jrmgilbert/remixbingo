import { Link } from "@remix-run/react";
import { useLayoutEffect, useState } from "react";
import { Button } from "~/components/ui/button";

export default function IndexRoute() {
  const [currentGridId, setCurrentGridId] = useState("");

  useLayoutEffect(() => {
    const gridId = window.localStorage.getItem("gridId");

    if (gridId) setCurrentGridId(gridId);
  }, []);

  return (
    <section className="flex flex-col items-stretch">
      <div className="my-8 space-y-4 text-lg">
        <p>Welcome to RemixBingo!</p>
        <p>Create your grid accomplish challenges and be the first to form a line or column to win a prize 🎁!</p>
      </div>

      {!currentGridId && (
        <Button variant="default" className="w-full my-2" asChild>
          <Link to="play">New grid</Link>
        </Button>
      )}

      {currentGridId && (
        <>
          <Button variant="default" className="w-full my-2" asChild>
            <Link to={`grid/${currentGridId}`}>Continue your grid</Link>
          </Button>

          <Button variant="outline" className="w-full my-2" asChild>
            <Link to="play">New grid</Link>
          </Button>
        </>
      )}

      <div className="my-8 space-y-4 text-sm text-muted-foreground">
        <p>
          Built with <a href="https://github.com/jrmgilbert/remixbingo">RemixBingo</a>.
        </p>
      </div>
    </section>
  );
}

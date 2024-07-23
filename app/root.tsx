import { Link, Links, Meta, MetaFunction, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";

import "./styles/tailwind.css";
import "./styles/globals.css";

import logo from "./assets/bingo.png";
import { Toaster } from "./components/ui/toaster";

export const meta: MetaFunction = () => {
  return [{ title: "RemixBingo" }, { name: "description", content: "Bingo game built with Remix" }];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="container max-w-[640px]">
          <header className="my-12 text-center">
            <Link to="/" className="">
              <h1 className="text-4xl font-black">
                <div className="sr-only">RemixBingo</div>
                <img src={logo} alt="RemixBingo logo" width={320} height={120} className="mx-auto" />
              </h1>
            </Link>
          </header>

          {children}
        </div>

        <Toaster />

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

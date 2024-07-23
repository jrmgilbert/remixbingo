import { PrismaClient } from "@prisma/client";
import cuid2Extension from "prisma-extension-cuid2";

import { singleton } from "./singleton.server";

// Hard-code a unique key, so we can look up the client when this module gets re-imported
export const db = singleton("prisma", () => new PrismaClient().$extends(cuid2Extension({
    fields: ['Item:id', 'Grid:id'],
    cuid2Options: {
      length: 8,
    }
  })));

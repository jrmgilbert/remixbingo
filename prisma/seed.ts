import { PrismaClient } from "@prisma/client";
import cuid2Extension from "prisma-extension-cuid2";

const db = new PrismaClient().$extends(
  cuid2Extension({
    fields: ["Item:id", "Grid:id"],
    cuid2Options: {
      length: 8,
    },
  })
);

async function seed() {
  await db.item.deleteMany();

  const items = getItems();

  for (const item of items) {
    await db.item.create({ data: { ...item } });
  }
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });

function getItems() {
  return [
    {
      category: 0,
      emoji: "🎉",
      title: "Title for this challenge",
      description: "Funny description for this challenge",
    },
    {
      category: 1,
      emoji: "🥂",
      title: "Title for this challenge",
      description: "Funny description for this challenge",
    },
    {
      category: 1,
      emoji: "🍎",
      title: "Title for this challenge",
      description: "Funny description for this challenge",
    },
    {
      category: 1,
      emoji: "📸",
      title: "Title for this challenge",
      description: "Funny description for this challenge",
    },
    {
      category: 1,
      emoji: "📖",
      title: "Title for this challenge",
      description: "Funny description for this challenge",
    },
    {
      category: 1,
      emoji: "📝",
      title: "Title for this challenge",
      description: "Funny description for this challenge",
    },
    {
      category: 1,
      emoji: "🏊",
      title: "Title for this challenge",
      description: "Funny description for this challenge",
    },
    {
      category: 1,
      emoji: "🏘",
      title: "Title for this challenge",
      description: "Funny description for this challenge",
    },
    {
      category: 1,
      emoji: "🎒",
      title: "Title for this challenge",
      description: "Funny description for this challenge",
    },
    {
      category: 1,
      emoji: "⛺",
      title: "Title for this challenge",
      description: "Funny description for this challenge",
    },
    {
      category: 1,
      emoji: "😊",
      title: "Title for this challenge",
      description: "Funny description for this challenge",
    },
    {
      category: 1,
      emoji: "🥨",
      title: "Title for this challenge",
      description: "Funny description for this challenge",
    },
    {
      category: 1,
      emoji: "🕺",
      title: "Title for this challenge",
      description: "Funny description for this challenge",
    },
    {
      category: 1,
      emoji: "👋",
      title: "Title for this challenge",
      description: "Funny description for this challenge",
    },
    {
      category: 1,
      emoji: "🏸",
      title: "Title for this challenge",
      description: "Funny description for this challenge",
    },
    {
      category: 1,
      emoji: "🎲",
      title: "Title for this challenge",
      description: "Funny description for this challenge",
    },
    {
      category: 1,
      emoji: "🐦",
      title: "Title for this challenge",
      description: "Funny description for this challenge",
    },
    {
      category: 1,
      emoji: "🃏",
      title: "Title for this challenge",
      description: "Funny description for this challenge",
    },
    {
      category: 1,
      emoji: "🤦‍♀",
      title: "Title for this challenge",
      description: "Funny description for this challenge",
    },
    {
      category: 2,
      emoji: "❓",
      title: "Title for this challenge",
      description: "Funny description for this challenge",
    },
    {
      category: 2,
      emoji: "❓",
      title: "Title for this challenge",
      description: "Funny description for this challenge",
    },
    {
      category: 2,
      emoji: "❓",
      title: "Title for this challenge",
      description: "Funny description for this challenge",
    },
    {
      category: 2,
      emoji: "❓",
      title: "Title for this challenge",
      description: "Funny description for this challenge",
    },
    {
      category: 2,
      emoji: "❓",
      title: "Title for this challenge",
      description: "Funny description for this challenge",
    },
    {
      category: 2,
      emoji: "❓",
      title: "Title for this challenge",
      description: "Funny description for this challenge",
    },
    {
      category: 2,
      emoji: "❓",
      title: "Title for this challenge",
      description: "Funny description for this challenge",
    },
  ];
}

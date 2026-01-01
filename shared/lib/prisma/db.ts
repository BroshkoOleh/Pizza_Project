// FIRST APPROACH:

// import "dotenv/config";
// import { PrismaPg } from "@prisma/adapter-pg";
// import { PrismaClient } from "./generatedPrisma/client";

// const connectionString = `${process.env.DATABASE_URL}`;

// const adapter = new PrismaPg({ connectionString });
// const prisma = new PrismaClient({ adapter });
// export default prisma ;

// SECOND APPROACH:

import { PrismaClient } from "./generatedPrisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prismaClientSingleton = () => {
  return new PrismaClient({
    adapter: adapter,
  });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

/**
 * First approach (simple):
 * - Creates a new Prisma instance on every module import
 * - Includes `dotenv/config` - explicitly loads environment variables
 * - Simpler and more understandable code
 *
 * Second approach (singleton pattern):
 * - Uses Singleton pattern - guarantees one Prisma instance across the entire app
 * - Stores instance in `globalThis` in development mode
 * - Prevents creating multiple connections during hot-reload (e.g., in Next.js)
 *
 * Which is better?
 *
 * Second approach is better for most cases, especially if you work with:
 * - Next.js - hot-reload can create dozens of connections without singleton
 * - Development mode with automatic code reloading
 * - Applications where controlling the number of DB connections is important
 *
 * First approach is suitable if:
 * - You have a simple app without hot-reload
 * - You use a regular Node.js server (Express, Fastify, etc.)
 * - Module is imported only once at startup
 */

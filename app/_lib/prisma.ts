import { PrismaClient } from "@prisma/client"

declare global {
    var cachedPrisma: PrismaClient | undefined
}

let prisma: PrismaClient
if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient()
} else {
    if (!global.cachedPrisma) { // Initialize only if it's not already initialized
        global.cachedPrisma = new PrismaClient()
    }
    prisma = global.cachedPrisma
}

export const db = prisma

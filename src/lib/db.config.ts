// Importing PrismaClient from the @prisma/client package
import { PrismaClient } from "@prisma/client";

// Casting the global object to a custom type that includes a PrismaClient instance
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Exporting the PrismaClient instance
// - If there's already a PrismaClient instance in the global scope (for development),
//   it reuses that instance.
// - Otherwise, it creates a new PrismaClient instance with logging options.
export const prisma =
  globalForPrisma.prisma || // Reuse the existing PrismaClient instance if available
  new PrismaClient({
    log: ["query", "error"], // Log all database queries and errors for debugging
  });

// During development, store the PrismaClient instance in the global scope
// - This prevents multiple instances from being created in development environments
//   (e.g., with hot-reloading frameworks like Next.js).
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma; // Save the PrismaClient instance globally
}

// Default export for easy import in other parts of the application
export default prisma;

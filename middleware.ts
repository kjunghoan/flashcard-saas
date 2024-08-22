import { clerkMiddleware } from "@clerk/nextjs/server";
// Only seems to work when name of file is middleware.ts.
// todo: figure out how to make it work with other names.
// todo: move to a middleware directory.
export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

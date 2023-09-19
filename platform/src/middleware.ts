import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    if (privateRoutes.includes(request.nextUrl.pathname)) {
      return NextResponse.json({ message: "Access denied" }, { status: 403 });
    }
  },
  {
    callbacks: {
      authorized: ({ token, req: request }) => {
        const isExistsToken = Boolean(token);
        if (!isExistsToken && publicRoutes.includes(request.nextUrl.pathname)) {
          return true;
        }

        return isExistsToken;
      },
    },
  }
);

const publicRoutes = ["/api/user", "/api/user/list"];

const privateRoutes = [
  // "/api/user",
  "/api/score",
  "/api/song",
  "/api/song-sets",
  "/api/user-auth",
];

export const config = {
  matcher: privateRoutes,
};

function isRoute(request: NextRequestWithAuth, path: string) {
  return request.nextUrl.pathname.startsWith(path);
}

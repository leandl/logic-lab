import { withAuth, NextRequestWithAuth } from "next-auth/middleware";

export default withAuth(function middleware(request: NextRequestWithAuth) {}, {
  callbacks: {
    authorized: ({ token }) => Boolean(token),
  },
});

export const config = {
  matcher: [
    // "/api/user",
    "/api/score",
    "/api/song",
    "/api/song-sets",
    "/api/user-auth",
  ],
};

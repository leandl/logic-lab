import { withAuth, NextRequestWithAuth } from "next-auth/middleware";

export default withAuth(function middleware(request: NextRequestWithAuth) {}, {
  callbacks: {
    authorized: ({ token }) => Boolean(token),
  },
});

export const config = {
  matcher: [
    "/",
    "/home",
    "/question/list",
    "/question/create",
    "/question/update/:questionId",
  ],
};

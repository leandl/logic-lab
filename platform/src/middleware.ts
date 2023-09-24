import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { ROUTE } from "@/config/route";
export default withAuth(function middleware(request: NextRequestWithAuth) {}, {
  callbacks: {
    authorized: ({ token }) => Boolean(token),
  },
});

export const config = {
  matcher: ["/"],
};

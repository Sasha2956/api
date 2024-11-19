import { auth } from "./auth";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "./routes";

export default auth((req) => {
  const { nextUrl } = req;

  const isAuthenticated = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }
  
  if (isAuthRoute) {
    if (isAuthenticated) {
      return Response.redirect(new URL(nextUrl, DEFAULT_LOGIN_REDIRECT));
    }

    return;
  }

  if (!isPublicRoute && !isAuthenticated) {
    return Response.redirect(new URL(nextUrl, "/login"));
  }

  return;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

import NextAuth from "next-auth"

// something is seriously fucked up in auth.js docs, that's why google provider differs
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    ({
      id: "google",
      name: "Google",
      type: "oidc",
      issuer: "https://accounts.google.com",
      style: { logo: "/google.svg", bg: "#fff", text: "#000" },
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      return profile?.email?.startsWith(process.env.CALENDAR_ID0!) || false;
    },
    // authorized({ auth, request: { nextUrl } }) {
    //   // check if user is authorized to visit nextUrl
    //   const isLoggedIn = !!auth?.user;
    //   const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
    //
    //   if (isOnDashboard) {
    //     // Redirect unauthenticated users to login page
    //     return isLoggedIn;
    //   } else if (isLoggedIn) {
    //     return Response.redirect(new URL('/dashboard', nextUrl));
    //   }
    //   return true;
    // },
  }
})

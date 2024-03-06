export function grabGoogleCreds(): { apiKey: string, clientId: string } {
  return {
    apiKey: process.env.GOOGLE_API_KEY || "",
    clientId: process.env.GOOGLE_CLIENT_ID || "",
  };
}

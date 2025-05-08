export default {
  baseURL: process.env.NEXT_PUBLIC_API_URI,
  isServer: typeof window === "undefined",
};

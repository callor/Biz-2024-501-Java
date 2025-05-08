export default {
  dev: process.env.NODE_ENV !== 'production',
  baseURL: process.env.NEXT_PUBLIC_API_URI,
  isServer: typeof window === 'undefined',
};

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        roles: string[];
      } | null;
    }
  }
}
export {};

// Auth Context
// export type AuthUserOld = {
//   id: number;
//   email: string;
//   name: string;
// };

type DBEntry = {
  id: number;
  createdAt: string;
  updatedAt: string;
};
export type User = DBEntry & {
  name: string | null;
  email: string;
  isActive: boolean;
};

export type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
};

// API (Data Loading)
type PaginatedResponse<T> = {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  results: T[];
};

export type Event = DBEntry & {
  title: string;
  description: string;
  date: string;
  location: string;
  latitude: number;
  longitude: number;
  organizerId: number;
};

export type UsersResponse = PaginatedResponse<User>;
export type EventsResponse = PaginatedResponse<Event>;

// API (Mutations)
// Base result types
export type ActionError = { error: string | null };
export type ActionSuccess<T> = { success: true } & T;

// Generic union for "something succeeded or failed"
export type ActionResult<T> = ActionSuccess<T> | ActionError | Response;

// Concrete payloads
export type AuthPayload = { user?: User; token?: string };
export type EventPayload = { message: string };

// Typed results
export type AuthActionResult = ActionResult<AuthPayload>;
export type CreateActionResult = ActionResult<EventPayload>;

export const isErrorResult = (data: unknown): data is ActionError =>
  !!data && typeof data === 'object' && 'error' in data && typeof data.error === 'string';

export const isSuccessResult = <T>(data: unknown): data is ActionSuccess<T> =>
  !!data && typeof data === 'object' && 'success' in data;

// A bit more refined
/* 
export const isErrorResult = <T extends { error?: unknown }>(
  data: unknown
): data is Extract<T, { error: string }> => {
  return typeof data === 'object' && data !== null && 'error' in data;
};

export const isSuccessResult = <T extends { success?: boolean }>(
  data: unknown
): data is Extract<T, { success: true }> => {
  return typeof data === 'object' && data !== null && 'success' in data && data.success === true;
};
*/

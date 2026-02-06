import type { EventsResponse } from '@/types';

const API_URL = import.meta.env.VITE_EVENTS_API_URL;

export const getAllEvents = async (query: string = `?page=1&limit=10`) => {
  if (!API_URL)
    throw new Error(
      'Something tells me you forgot to set the VITE_EVENTS_API_URL environment variable.'
    );

  const res = await fetch(`${API_URL}/events${query}`);

  if (!res.ok) {
    throw new Error('Failed to fetch events');
  }
  return (await res.json()) as EventsResponse;
};

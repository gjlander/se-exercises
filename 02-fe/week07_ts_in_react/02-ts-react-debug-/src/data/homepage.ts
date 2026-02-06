const API_URL = import.meta.env.VITE_EVENTS_API_URL;

export const getHomePageData = async () => {
  if (!API_URL)
    throw new Error(
      'Something tells me you forgot to set the VITE_EVENTS_API_URL environment variable.'
    );
  const usersPromise = fetch(`${API_URL}/users`);
  const eventsPromise = fetch(`${API_URL}/events`);
  const [resUsers, resEvents] = await Promise.all([usersPromise, eventsPromise]);
  if (!resUsers.ok || !resEvents.ok) {
    throw new Error('Failed to fetch data');
  }
  const [users, events] = await Promise.all([resUsers.json(), resEvents.json()]);
  return { userCount: users.totalCount, eventsCount: events.totalCount };
};

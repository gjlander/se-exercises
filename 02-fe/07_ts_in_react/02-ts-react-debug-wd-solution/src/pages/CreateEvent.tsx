import type { Event, EventsResponse } from '@/types';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@/contexts';
import { CreateEventModal } from '@/components';
import { getAllEvents } from '@/data';

const CreateEvent = () => {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState<EventsResponse['currentPage']>(1);
  const [hasNextPage, setHasNextPage] = useState<EventsResponse['hasNextPage']>();
  const [loading, setLoading] = useState(false);
  const [refreshEvents, setRefreshEvents] = useState(false);
  const [isNewEvent, setIsNewEvent] = useState(false);

  const { user } = useAuth();
  const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    let ignore = false;
    const loadInitialEvents = async () => {
      try {
        setLoading(true);

        const { currentPage, hasNextPage, results } = await getAllEvents();
        if (!ignore) {
          setAllEvents(results);
          setCurrentPage(currentPage);
          setHasNextPage(hasNextPage);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        setRefreshEvents(false);
      }
    };
    loadInitialEvents();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;
    const loadEvents = async () => {
      try {
        setLoading(true);
        const searchParams = `?page=${currentPage}&limit=10`;
        const { currentPage: currPage, hasNextPage, results } = await getAllEvents(searchParams);
        if (!ignore) {
          setCurrentPage(currPage);
          setHasNextPage(hasNextPage);
          if (isNewEvent) {
            setAllEvents(results);
          } else {
            setAllEvents((prev) => [...prev, ...results]);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        setRefreshEvents(false);
        setIsNewEvent(false);
      }
    };
    if (refreshEvents) loadEvents();
    return () => {
      ignore = true;
    };
  }, [refreshEvents, currentPage, isNewEvent]);

  const loadMoreEvents = useCallback(async () => {
    if (loading || !hasNextPage) return;

    setCurrentPage((prev) => prev + 1);
    setRefreshEvents(true);
  }, [hasNextPage, setCurrentPage, loading]);

  const refreshForNewEvent = () => {
    setCurrentPage(1);
    setRefreshEvents(true);
    setIsNewEvent(true);
  };

  const handleCreateEventClick = () => modalRef.current?.showModal();

  const eventsByUser = allEvents.filter((event) => event.organizerId === user?.id);

  return (
    <div className='container mx-auto p-4'>
      <div>Welcome back, {user?.name || user?.email}!</div>
      <div>
        <div className='flex justify-between items-center mb-4'>
          <h2>Your Events ({eventsByUser.length})</h2>
          <div className='flex gap-2'>
            <button className='btn btn-primary' onClick={handleCreateEventClick}>
              Create New Event
            </button>
            {hasNextPage && eventsByUser.length ? (
              <button onClick={loadMoreEvents} disabled={loading} className='btn btn-secondary'>
                {loading ? 'Loading...' : 'Load More Events'}
              </button>
            ) : null}
          </div>
        </div>
        {!eventsByUser.length ? (
          <p>You haven't created any events yet.</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {eventsByUser.map((event) => (
              <div key={event.id} className='card bg-base-100 shadow-xl'>
                <div className='card-body'>
                  <h3 className='card-title'>{event.title}</h3>
                  <p>{event.description}</p>
                  <p>
                    <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Location:</strong> {event.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <CreateEventModal refreshForNewEvent={refreshForNewEvent} modalRef={modalRef} />
    </div>
  );
};
export default CreateEvent;

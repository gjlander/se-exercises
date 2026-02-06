import type { Event, EventsResponse } from '@/types';
import { useState, useEffect, useRef, useCallback } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { EventsList, EventsMarkers, MapBounds, PanOnHover } from '@/components';
import { getAllEvents } from '@/data';
import 'leaflet/dist/leaflet.css';

const Events = () => {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState<EventsResponse['currentPage']>(1);
  const [hasNextPage, setHasNextPage] = useState<EventsResponse['hasNextPage']>();
  const [highlightedEvent, setHighlightedEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshEvents, setRefreshEvents] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let ignore = false;
    const loadEvents = async () => {
      try {
        setLoading(true);
        let result;
        if (currentPage <= 1) {
          result = await getAllEvents();
        } else {
          const searchParams = `?page=${currentPage}&limit=10`;
          result = await getAllEvents(searchParams);
        }
        if (!ignore) {
          const { currentPage: currPage, hasNextPage, results } = result;
          setAllEvents((prev) => [...prev, ...results]);
          setCurrentPage(currPage);
          setHasNextPage(hasNextPage);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        setRefreshEvents(false);
      }
    };
    if (refreshEvents) loadEvents();
    return () => {
      ignore = true;
    };
  }, [refreshEvents, currentPage]);

  const loadMoreEvents = useCallback(() => {
    if (loading || !hasNextPage) return;
    setCurrentPage((prev) => prev + 1);
    setRefreshEvents(true);
  }, [hasNextPage, setCurrentPage, loading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreEvents();
        }
      },
      { threshold: 0.1 }
    );
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => observer.disconnect();
  }, [loadMoreEvents]);

  return (
    <>
      <title>Upcoming Events</title>
      <div className='flex flex-col md:flex-row justify-between gap-5 my-3'>
        <div className='w-full md:w-2/5 p-4 overflow-y-auto'>
          <h1 className='text-2xl font-bold p-4'>Upcoming Events</h1>
          <div className='grid grid-cols-2 gap-4'>
            <EventsList events={allEvents} setHighlightedEvent={setHighlightedEvent} />
            <div ref={observerRef} className='h-4'></div>
          </div>
          {loading && (
            <div className='w-full flex items-center justify-center'>
              <span className='loading loading-ring loading-xl text-primary'></span>
            </div>
          )}
        </div>
        <div className='hidden md:block md:w-3/5 h-[870px] rounded-2xl overflow-hidden sticky top-20'>
          <MapContainer zoom={13} className='h-full '>
            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
            <MapBounds events={allEvents} />
            <PanOnHover event={highlightedEvent} />
            <EventsMarkers events={allEvents} />
          </MapContainer>
        </div>
      </div>
    </>
  );
};

export default Events;

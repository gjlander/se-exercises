import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const MapBounds = ({ events }) => {
  const map = useMap();

  useEffect(() => {
    const bounds = events.map((event) => [event.latitude, event.longitude]);
    map.fitBounds(bounds);
  }, [map, events]);

  return null;
};

export default MapBounds;

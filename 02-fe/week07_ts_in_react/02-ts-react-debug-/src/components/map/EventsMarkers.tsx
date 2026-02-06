import { Marker, Popup } from 'react-leaflet';

const EventsMarkers = ({ events }) => {
  return events.map((event) => (
    <Marker key={event.id} position={[event.latitude, event.longitude]}>
      <Popup>
        <h2>{event.title}</h2>
        <p>{event.description}</p>
        <p>
          <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
        </p>
        <p>
          <strong>Location:</strong> {event.location}
        </p>
      </Popup>
    </Marker>
  ));
};
export default EventsMarkers;

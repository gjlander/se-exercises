import { destinations } from '../../data';
import { DestCard } from '..';
const PopDests = () => {
  return (
    <section className='space-y-6 px-4'>
      <h2 className='text-3xl font-bold text-secondary text-center'>Popular Destinations</h2>
      <div className='grid md:grid-cols-3 gap-6'>
        {destinations.slice(0, 3).map(destination => (
          <DestCard key={destination.slug} {...destination} />
        ))}
      </div>
    </section>
  );
};

export default PopDests;

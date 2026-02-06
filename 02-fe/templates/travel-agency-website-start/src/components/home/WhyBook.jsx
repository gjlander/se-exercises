const WhyBook = () => {
  return (
    <section className='text-center space-y-6 px-4'>
      <h2 className='text-3xl font-bold text-secondary'>Why Book With Us?</h2>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-6'>
        <div className='bg-base-200 p-4 rounded-box shadow'>
          <h3 className='font-semibold text-lg'>Curated Student Trips</h3>
          <p>Every destination is selected to inspire, educate, and energize student travelers.</p>
        </div>
        <div className='bg-base-200 p-4 rounded-box shadow'>
          <h3 className='font-semibold text-lg'>Affordable Packages</h3>
          <p>Group rates and student discounts help you travel smart and save money.</p>
        </div>
        <div className='bg-base-200 p-4 rounded-box shadow'>
          <h3 className='font-semibold text-lg'>Flexible Dates</h3>
          <p>Travel plans built around academic calendars and exam breaks.</p>
        </div>
      </div>
    </section>
  );
};

export default WhyBook;

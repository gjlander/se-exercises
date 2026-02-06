const Search = () => {
  const handleSearch = e => {
    e.preventDefault();
  };
  return (
    <section className='text-center space-y-4'>
      <h1 className='text-4xl font-bold text-primary'>Find Your Next Student Adventure</h1>
      <form
        onSubmit={handleSearch}
        className='md:join w-full flex flex-col md:flex-row gap-2 md:gap-0 justify-center px-4'
      >
        <input name='origin' type='text' placeholder='Origin' className='w-full input input-bordered join-item' />
        <input
          name='destination'
          type='text'
          placeholder='Destination'
          className='w-full input input-bordered join-item'
        />
        <input name='departure' type='date' className='w-full input input-bordered join-item' />
        <input name='return' type='date' className='w-full input input-bordered join-item' />
        <button type='submit' className='btn btn-primary join-item'>
          Search
        </button>
      </form>
    </section>
  );
};

export default Search;

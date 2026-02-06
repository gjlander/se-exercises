const AddToDo = () => {
  const handleSubmit = e => {
    e.preventDefault();
    const value = e.target.elements.todo.value;
    if (!value) return;
    console.log(value);
  };

  return (
    <form onSubmit={handleSubmit} className='mb-4 flex'>
      <input type='text' name='todo' placeholder='Add a new to-do' className='flex-1 border rounded px-2 py-1 mr-2' />
      <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>
        Add
      </button>
    </form>
  );
};

export default AddToDo;

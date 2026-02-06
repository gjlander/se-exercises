const ToDoItem = ({ todo }) => {
  return (
    <li className='flex items-center mb-2'>
      <label>
        <input type='checkbox' defaultChecked={todo.completed} className='mr-2' />
        {todo.text}
      </label>
    </li>
  );
};

export default ToDoItem;

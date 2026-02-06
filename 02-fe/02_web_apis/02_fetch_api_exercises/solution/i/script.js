const todoList = document.querySelector('#todo-list');

const renderTodo = (todo, container) => {
  const li = document.createElement('li');
  li.setAttribute('id', todo.id);
  li.textContent = todo.title;
  todo.completed ? (li.className = 'bg-green-500 border-2') : (li.className = 'bg-red-500 border-2');
  container.appendChild(li);
};
const renderErrorMsg = (errorMsg, container) => {
  console.error(errorMsg);
  const h2 = document.createElement('h2');
  h2.className = 'inline-block m-auto text-6xl mb-6 text-red-600';
  h2.textContent = errorMsg;
  container.appendChild(h2);
};
const fetchTodos = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos');
  const data = await res.json();
  if (!res.ok) throw new Error(`${res.status} Something went wrong! `);

  console.log(data);
  return data;
};

const fetchAndRenderTodos = async () => {
  try {
    const todos = await fetchTodos();
    todos?.forEach(todo => {
      renderTodo(todo, todoList);
    });
  } catch (error) {
    renderErrorMsg(error, todoList);
  }
};

fetchAndRenderTodos();

// fetchTodos()
//   .then(data =>
//     data?.forEach(todo => {
//       renderTodo(todo, todoList);
//     })
//   )
//   .catch(err => renderErrorMsg(err, todoList));
// document.addEventListener('DOMContentLoaded', fetchAndRenderTodos());

const getTodos = async (abortCont) => {
	const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
		signal: abortCont.signal
	});

	if (!res.ok) throw new Error(`${res.status}. Something went wrong!`);

	const data = await res.json();

	return data;
};

export { getTodos };

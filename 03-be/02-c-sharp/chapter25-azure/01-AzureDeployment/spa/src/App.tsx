import { useState, useEffect } from 'react';
const apiUrl = import.meta.env.VITE_API_URL as string;

function App() {
	const [message, setMessage] = useState('');

	useEffect(() => {
		(async () => {
			const res = await fetch(`${apiUrl}/message`);

			const data = await res.json();

			setMessage(data.message);
		})();
	}, []);
	return (
		<div>
			<h1>{message}</h1>
		</div>
	);
}

export default App;

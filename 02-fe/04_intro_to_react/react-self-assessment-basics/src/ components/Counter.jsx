import { useState } from 'react';

const Counter = () => {
	const [counter, setCounter] = useState(0);
	// TODO: Create a piece of state and initialize it to 0
	// TODO: Render current value
	// TODO: Add "Increment" button to increase count by 1
	const handleDec = () => setCounter(prev => prev - 1);
	const handleInc = () => setCounter(prev => prev + 1);
	// TODO: Add "Decrement" button to decrease count by 1
	// TODO: Add "Reset" button to reset count to 0
	const handleReset = () => setCounter(0);
	// TODO: Add "Change sign" button to toggle between positive and negative count

	const toggleSign = () => setCounter(prev => prev - 2 * prev);
	return (
		<div>
			<button onClick={handleDec}>decrement</button>
			<span>Count: {counter}</span>
			<button onClick={handleInc}>increment</button>
			<button onClick={handleReset}>reset</button>
			<button onClick={toggleSign}>change sign</button>
		</div>
	);
};

export default Counter;

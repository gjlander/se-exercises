// components/Counter.tsx
// This component should receive an `initialCount` number prop
// Pass that initial count as the initial value of a piece of state called count

import { useState } from 'react';

// Render buttons to increase, decrease and reset
const Counter = ({ initialCount }: { initialCount: number }) => {
	const [count, setCount] = useState(initialCount);
	return (
		<div>
			<p>Initial count: {initialCount}</p>
			<div>
				Current count:
				<button onClick={() => setCount((prev) => prev - 1)}>-</button>
				<span>{count}</span>
				<button onClick={() => setCount((prev) => prev + 1)}>+</button>
				<button onClick={() => setCount(initialCount)}>Reset</button>
			</div>
		</div>
	);
};

export default Counter;

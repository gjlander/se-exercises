const Counter = ({ state, setter }) => {
    return (
        <div style={{ display: 'flex', gap: '1rem', margin: '1rem' }}>
            <h2>Counter</h2>
            <button onClick={() => setter((prev) => prev - 1)}>-</button>
            <p>{state}</p>
            <button onClick={() => setter((prev) => prev + 1)}>+</button>
        </div>
    );
};

export default Counter;

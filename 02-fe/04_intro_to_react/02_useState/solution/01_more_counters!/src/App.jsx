import { useState } from 'react';
import Counter from './components/Counter';

const App = () => {
    const [counter1, setCounter1] = useState(0);
    const [counter2, setCounter2] = useState(0);
    const [counter3, setCounter3] = useState(0);
    return (
        <div>
            <Counter state={counter1} setter={setCounter1} />
            <Counter state={counter2} setter={setCounter2} />
            <Counter state={counter3} setter={setCounter3} />
        </div>
    );
};

export default App;

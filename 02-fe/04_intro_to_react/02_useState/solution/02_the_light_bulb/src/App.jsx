import { useState } from 'react';
import LightBulb from './components/LightBulb';
import './style.css';

const App = () => {
  const [lightOn, setLightOn] = useState(false);
  const [count, setCount] = useState(0);
  const maxTurns = 10;
  const toggleLight = () => {
    if (!lightOn && count >= maxTurns) {
      alert('Save some energy! Lights off for now');
      return;
    }
    if (!lightOn) {
      setCount(prev => prev + 1);
    }

    setLightOn(prev => !prev);
  };

  return (
    <>
      <button onClick={toggleLight}>
        {count >= maxTurns && !lightOn ? 'Locked' : lightOn ? 'Turn off' : 'Turn on'}
      </button>
      <LightBulb lightOn={lightOn} />
    </>
  );
};

export default App;

import Greeting from './components/Greeting';
import Button from './components/Button';

const App = () => {
  return (
    <div>
      <Greeting name='Jorge' />
      <Greeting name={'42'} />
      {/* <Button /> */}
      {/* <img draggable="false" role="img" class="emoji" alt="❌" src="https://s.w.org/images/core/emoji/16.0.1/svg/274c.svg"> Property 'label' is missing in type '{}' */}
      <Button label='Click Me' colour='green' />
      <Button label='Submit' />
    </div>
  );
};

export default App;

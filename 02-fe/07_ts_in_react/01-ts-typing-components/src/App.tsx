import { useState } from 'react';
import Container from './layouts/Container';
import Greeting from './components/Greeting';
import Counter from './components/Counter';
import Status from './components/Status';
import ProfileCard from './components/ProfileCard';
import Alert from './components/Alert';
import ProductList from './components/ProductList';
import Toggle from './components/Toggle';
import Avatar from './components/Avatar';

const App = () => {
	const [isOn, setIsOn] = useState(true);
	return (
		<Container style={{ maxWidth: '600px', margin: '0 auto' }}>
			<Greeting name='Jeff' />
			<Counter initialCount={5} />
			<Status status='loading' />
			<ProfileCard user={{ name: 'Ada', age: 32 }} />
			<Alert message='Feel alerted?' type='info' />
			<ProductList
				products={[
					{ id: 1, title: 'Book' },
					{ id: 2, title: 'Pen' }
				]}
			/>
			<Toggle isOn={isOn} onToggle={() => setIsOn((prev) => !prev)} />
			<Avatar url='a url here' altText='a user avatar' />
		</Container>
	);
};

export default App;

import Card from './components/Card';

function App() {
	return (
		<div className='p-8'>
			<header className='text-center'>
				<h1 className='text-6xl'>Runtime Validation with Zod</h1>
				<p>
					Step 6: Use your validated data to render cards. Pass the needed data via props, and replace the current hard
					coded values
				</p>
			</header>
			<section className='p-4 grid grid-cols-[repeat(auto-fill,minmax(24rem,1fr))]  gap-6 justify-center'>
				{Array.from({ length: 9 }).map(() => (
					<Card />
				))}
			</section>
		</div>
	);
}

export default App;

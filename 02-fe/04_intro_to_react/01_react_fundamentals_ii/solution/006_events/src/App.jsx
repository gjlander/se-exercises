import './index.css';

const App = () => {
	const handleChange = (e) => {
		console.log(e.target.value);
		if (e.target.value === 'secretcodeunlocked')
			alert('You discovered my secret!');
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		const form = e.target;
		const { name, email, message, button } = form.elements;
		const nameValue = name.value.trim();
		const emailValue = email.value.trim();
		const msgValue = message.value.trim();
		try {
			button.disabled = true;

			if (!nameValue) throw new Error('Name is required');
			if (nameValue.length < 2)
				throw new Error('Name has to be at least 2 characters long');

			if (!emailValue) throw new Error('Email is required');

			if (!emailValue.includes('@')) throw new Error('Invalid email');

			if (!msgValue) throw new Error('Message is required');
			if (msgValue.length < 5)
				throw new Error('Message has to be at least 5 characters long');

			const surveyData = {
				name: nameValue,
				email: emailValue,
				message: msgValue
			};

			console.log(surveyData);
			alert('Thanks for completing the survey!');
			form.reset();
			setTimeout(() => (button.disabled = false), 3000);
		} catch (error) {
			console.error(error);
			alert(error.message || 'Something went wrong');
			button.disabled = false;
		}
	};

	return (
		<div className='App'>
			<h2>Click Event</h2>
			<button onClick={() => alert('Surprise!')}>Click me!</button>
			<h2>Change Event</h2>
			<label>
				Try to guess the secret
				<input onChange={handleChange} type='text' name='name' />
			</label>
			<h1>Mini Survey</h1>
			<form onSubmit={handleSubmit} noValidate>
				<label>
					Name
					<input type='text' name='name' />
				</label>
				<label>
					Email
					<input type='text' name='email' />
				</label>
				<label>
					Message
					<textarea name='message' id=''></textarea>
				</label>

				<button name='button' type='submit'>
					Submit
				</button>
			</form>
		</div>
	);
};

export default App;

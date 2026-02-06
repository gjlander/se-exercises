import { useState } from 'react';

const App = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    tel: '',
    message: ''
  });
  const { name, email, tel, message } = form;

  const handleSubmit = e => {
    e.preventDefault();
    try {
      if (!name) throw new Error('Name is required');
      if (!email) throw new Error('Email is required');
      if (!tel) throw new Error('Telephone is required');
      if (!message) throw new Error('Message is required');

      console.log(form);
      setForm({
        name: '',
        email: '',
        tel: '',
        message: ''
      });
    } catch (error) {
      alert(error.message);
    }
  };
  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          width: '25%'
        }}
        onSubmit={handleSubmit}
      >
        <label>
          Name:
          <input value={name} onChange={handleChange} type='text' name='name' />
        </label>
        <label>
          Email:
          <input value={email} onChange={handleChange} type='email' name='email' />
        </label>
        <label>
          Telephone:
          <input value={tel} onChange={handleChange} type='tel' name='tel' />
        </label>
        <label>
          Message:
          <textarea value={message} onChange={handleChange} name='message'></textarea>
        </label>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default App;

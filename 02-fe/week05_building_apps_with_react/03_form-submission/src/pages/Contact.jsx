import { ErrorBoundary } from 'react-error-boundary';
import { sendContactForm } from '../api';
import { ErrorFallback, Instructions, SubmitBtn } from '../components';

const Contact = () => {
  const sendAction = async formData => {
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const message = formData.get('message');

    const response = await sendContactForm({ firstName, lastName, email, message });
    console.log(response);
  };
  return (
    <div className='flex flex-col items-center'>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <form action={sendAction}>
          <fieldset className='fieldset bg-base-200 border-base-300 rounded-box w-lg border p-4'>
            <legend className='fieldset-legend'>Contact Us</legend>
            <label className='label'>First Name</label>
            <input className='input w-full' name='firstName' placeholder='First Name' />
            <label className='label'>Last Name</label>
            <input className='input w-full' name='lastName' placeholder='Last Name' />
            <label className='label'>Email</label>
            <input className='input w-full' name='email' placeholder='Email' />
            <label className='label'>Message</label>
            <textarea className='textarea w-full' name='message' placeholder='Your message' rows={4} />
            <SubmitBtn className='btn btn-neutral mt-4'>Send</SubmitBtn>
          </fieldset>
        </form>
      </ErrorBoundary>
      <Instructions path='/contact.md' />
    </div>
  );
};

export default Contact;

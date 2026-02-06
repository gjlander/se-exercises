import { ErrorBoundary } from 'react-error-boundary';
import { registerNewsletter } from '../api';
import { ErrorFallback, Instructions, SubmitBtn } from '../components';

const Register = () => {
  const registerAction = async formData => {
    const email = formData.get('email');
    const message = await registerNewsletter(email);
    console.log(message);
  };
  return (
    <div className='flex flex-col items-center'>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <form action={registerAction}>
          <fieldset className='fieldset bg-base-200 border-base-300 rounded-box w-lg border p-4'>
            <legend className='fieldset-legend'>Register to our newsletter</legend>
            <label className='label'>Email</label>
            <input className='input w-full' name='email' placeholder='Email' />
            <SubmitBtn>Register</SubmitBtn>
          </fieldset>
        </form>
      </ErrorBoundary>
      <Instructions path='/register.md' />
    </div>
  );
};

export default Register;

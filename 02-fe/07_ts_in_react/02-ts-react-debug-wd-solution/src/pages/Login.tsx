import { type AuthActionResult, isErrorResult, isSuccessResult } from '@/types';
import { useActionState, useEffect, useState, type ChangeEvent } from 'react';
import { Link, Navigate } from 'react-router';
import { useAuth } from '@/contexts';
import { loginAction } from '@/actions';

const Login = () => {
  const [actionData, submitAction, isPending] = useActionState(loginAction, {} as AuthActionResult);
  const [form, setForm] = useState({ email: '', password: '' });
  const { isAuthenticated, login } = useAuth();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (isSuccessResult(actionData) && actionData?.token) {
      login(actionData?.token);
    }
  }, [actionData, login]);

  if (isAuthenticated) return <Navigate to='/app' replace />;

  return (
    <div className='flex items-center justify-center absolute inset-0'>
      <div className='w-full max-w-md p-8 space-y-4 bg-base-100 shadow-xl rounded-box'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold'>Sign in to your account</h2>
        </div>
        {isErrorResult(actionData) && (
          <div className='alert alert-error'>
            <span>{actionData.error}</span>
          </div>
        )}
        <form action={submitAction} className='space-y-4'>
          <div className='form-control'>
            <label htmlFor='email' className='label'>
              <span className='label-text'>Email address</span>
            </label>
            <input
              name='email'
              onChange={handleChange}
              value={form.email}
              required
              placeholder='Enter your email'
              className='input input-bordered w-full'
            />
          </div>
          <div className='form-control'>
            <label htmlFor='password' className='label'>
              <span className='label-text'>Password</span>
            </label>
            <input
              name='password'
              onChange={handleChange}
              value={form.password}
              type='password'
              placeholder='Enter your password'
              className='input input-bordered w-full'
            />
          </div>
          <div className='form-control'>
            <button disabled={isPending} type='submit' className='btn btn-primary w-full'>
              Sign in
            </button>
          </div>
          <div className='text-center'>
            <Link to='/register' className='link link-primary'>
              Don’t have an account? Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

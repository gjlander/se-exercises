import { useActionState, useEffect, useState, type ChangeEvent } from 'react';
import { type AuthActionResult, isErrorResult, isSuccessResult } from '@/types';
import { Link, Navigate, useNavigate } from 'react-router';
import { useAuth } from '@/contexts';
import { registerAction } from '@/actions';

const Register = () => {
  const navigate = useNavigate();
  const [actionData, submitAction, isPending] = useActionState(
    registerAction,
    {} as AuthActionResult
  );
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { isAuthenticated } = useAuth();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (isSuccessResult(actionData)) {
      navigate('/login', {
        replace: true
      });
    }
  }, [actionData, navigate]);

  if (isAuthenticated) return <Navigate to='/app' replace />;

  return (
    <div className='flex items-center justify-center absolute inset-0'>
      <div className='w-full max-w-md p-8 space-y-4 bg-base-100 shadow-xl rounded-box'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold'>Create your account</h2>
        </div>
        {isErrorResult(actionData) && (
          <div className='alert alert-error'>
            <span>{actionData.error}</span>
          </div>
        )}
        <form action={submitAction} className='space-y-4'>
          <div className='form-control'>
            <label htmlFor='email' className='label'>
              <span className='label-text'>Name</span>
            </label>
            <input
              name='name'
              onChange={handleChange}
              value={form.name}
              placeholder='Enter your name'
              className='input input-bordered w-full'
            />
          </div>
          <div className='form-control'>
            <label htmlFor='email' className='label'>
              <span className='label-text'>Email address</span>
            </label>
            <input
              name='email'
              onChange={handleChange}
              value={form.email}
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
            <button type='submit' disabled={isPending} className='btn btn-primary w-full'>
              Sign up
            </button>
          </div>
          <div className='text-center'>
            <Link to='/login' className='link link-primary'>
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

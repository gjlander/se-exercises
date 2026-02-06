import { useFormStatus } from 'react-dom';

const SubmitBtn = ({ children }) => {
  const { pending } = useFormStatus();

  return (
    <button type='submit' className='btn btn-neutral mt-4' disabled={pending}>
      {pending ? (
        <>
          <span className='loading loading-spinner'></span>
          {children + 'ing...'}
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default SubmitBtn;

import {
  useActionState,
  useState,
  useEffect,
  useRef,
  startTransition,
  type RefObject,
  type ChangeEvent
} from 'react';
import { isErrorResult, isSuccessResult, type CreateActionResult } from '@/types';
import { createEventAction } from '@/actions';

export default function CreateEventModal({
  refreshForNewEvent,
  modalRef
}: {
  refreshForNewEvent: () => void;
  modalRef: RefObject<HTMLDialogElement | null>;
}) {
  const [actionData, submitAction, isPending] = useActionState(
    createEventAction,
    {} as CreateActionResult
  );
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    latitude: '',
    longitude: ''
  });
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const cleanUp = () => {
    setForm({
      title: '',
      description: '',
      date: '',
      location: '',
      latitude: '',
      longitude: ''
    });
    modalRef?.current?.close();
  };

  useEffect(() => {
    if (isSuccessResult(actionData)) {
      cleanUp();

      // TODO: fix error so it only refreshes if you didn't cancel
      if (actionData?.message !== 'Event cancelled') refreshForNewEvent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  return (
    <dialog ref={modalRef} className='modal' onClose={cleanUp}>
      <div className='modal-box w-full max-w-2xl'>
        <h3 className='font-bold text-xl lg:text-2xl mb-6'>Create New Event</h3>
        {isErrorResult(actionData) && (
          <div className='alert alert-error'>
            <span>{actionData.error}</span>
          </div>
        )}
        <form action={submitAction} className='space-y-6' ref={formRef}>
          <div className='form-control'>
            <label className='label' htmlFor='title'>
              <span className='label-text'>Event Title</span>
            </label>
            <input
              name='title'
              onChange={handleChange}
              value={form.title}
              type='text'
              placeholder='Summer Gala 2025'
              className='input input-bordered w-full'
            />
          </div>
          <div className='form-control'>
            <label className='label' htmlFor='description'>
              <span className='label-text'>Description</span>
            </label>
            <textarea
              name='description'
              onChange={handleChange}
              value={form.description}
              placeholder="Give attendees a taste of what's coming…"
              className='textarea textarea-bordered h-28 resize-none w-full'
            />
          </div>
          <div className='form-control'>
            <label className='label' htmlFor='date'>
              <span className='label-text'>Date & Time</span>
            </label>
            <input name='date' type='datetime-local' className='input input-bordered w-full' />
          </div>
          <div className='form-control'>
            <label className='label' htmlFor='location'>
              <span className='label-text'>Location</span>
            </label>
            <input
              name='location'
              onChange={handleChange}
              value={form.location}
              type='text'
              placeholder='Berlin Congress Center'
              className='input input-bordered w-full'
            />
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div className='form-control'>
              <label className='label' htmlFor='latitude'>
                <span className='label-text'>Latitude</span>
              </label>
              <input
                name='latitude'
                onChange={handleChange}
                value={form.latitude}
                type='number'
                step='any'
                placeholder='52.5200'
                className='input input-bordered w-full'
              />
            </div>
            <div className='form-control'>
              <label className='label' htmlFor='longitude'>
                <span className='label-text'>Longitude</span>
              </label>
              <input
                name='longitude'
                onChange={handleChange}
                value={form.longitude}
                type='number'
                step='any'
                placeholder='13.4050'
                className='input input-bordered w-full'
              />
            </div>
          </div>
          <div className='modal-action mt-8'>
            <button
              type='button'
              className='btn btn-ghost'
              onClick={() => startTransition(() => submitAction(null))}
            >
              Cancel
            </button>
            <button type='submit' className='btn btn-primary' disabled={isPending}>
              Create Event
            </button>
          </div>
        </form>
      </div>
      <form method='dialog' className='modal-backdrop'>
        <button aria-label='Close modal'>close</button>
      </form>
    </dialog>
  );
}

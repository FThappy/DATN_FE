'use client';

import { useFormStatus } from 'react-dom';

export function SubmitButtonForgotPassword() {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      className={`h-[2.5rem] w-[22rem] relative flex items-center justify-center rounded font-bold text-white text-xl  after:absolute after:left-[-5px] after:bottom-[-5px]
      after:border-dashed after:border-[1px]  after:border-red after:z-10 after:visible after:w-full  after:h-[2.3rem] after:rounded 
      after:hover:left-[0px] after:hover:bottom-[0px] after:hover:z-[-20]  bg-red	 animatie  col-span-2	 mx-[9rem] mt-[1rem]
      `}
      disabled={pending}
    >
      {pending ? (
        <>
          <p>Loading</p>
          <div className='loader'></div>
        </>
      ) : (
        'Xác nhận'
      )}
    </button>
  );
}

import { certainUser } from '@/actions/certainUser';
import { getCertainOTP } from '@/actions/getCertainOTP';
import toastifyUtils from '@/utils/toastify';
import { checkValidGmail } from '@/utils/utilsEmail';
import Image from 'next/image';
import React, { FormEvent, useEffect, useState } from 'react';
import { FaLessThanEqual } from 'react-icons/fa';

type Props = {
  email: string;
  type: string;
  message: string;
  setTokenChange: React.Dispatch<React.SetStateAction<string>>;
};

const CertaintUser = (props: Props) => {
  const { email, type, message, setTokenChange } = props;

  const [pending, setPending] = useState(false);

  const getOTP = async () => {
    setPending(true);
    try {
      if (!checkValidGmail(email)) {
        setPending(false);
        return toastifyUtils('warning', 'Định dạnh email không hợp lệ');
      }
      const res = await getCertainOTP(email, type, message);
      if (res && res.code === 3) {
        setPending(false);
        return toastifyUtils('warning', 'Lỗi gửi OTP');
      }
      if (res && res.code === 4) {
        setPending(false);
        return toastifyUtils('error', 'Lỗi server');
      }
      if (res && res.code === 2) {
        setPending(false);
        return toastifyUtils('warning', 'Email không hợp lệ');
      }
      if (res && res.code === 1) {
        setPending(false);
        return toastifyUtils('warning', 'Không tồn tại email này');
      }
      toastifyUtils('success', 'Đã gửi otp');
      setPending(false);
    } catch (error) {
      setPending(false);
      console.log(error);
      toastifyUtils('error', 'Lỗi Server');
    }
  };

  useEffect(() => {
    getOTP();
  }, [email, type, message]);

  const handleCertainUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setPending(true);

    try {
      const res = await certainUser(email, formData, type);
      if (res.code === 1) {
        setPending(false);

        return toastifyUtils('warning', 'Email không hợp lệ');
      }
      if (res.code === 2) {
        setPending(false);

        return toastifyUtils('warning', 'Email không tồn tại');
      }
      if (res.code === 3) {
        setPending(false);

        return toastifyUtils('warning', 'OTP không chính xác');
      }
      if (res.code === 4) {
        setPending(false);

        return toastifyUtils('error', 'Lỗi server');
      }
      if (res.code === 0) {
        setPending(false);

        setTokenChange(res.tokenChange);
      }
    } catch (error) {
      setPending(false);

      return toastifyUtils('error', 'Lỗi server');
    }
  };

  return (
    <div className='flex flex-col w-[60%] items-center mt-8'>
      <p className={`font-bold text-red text-[5rem] mt-4 mb-2`}>Xác thực người dùng</p>

      <form onSubmit={handleCertainUser} className='gap-2 flex flex-col justify-center items-center w-full'>
        <div className='flex items-center bg-[#f1eff4d1] rounded h-[2.5rem] w-[22rem] p-2 gap-2 mt-2 border-slate-300 border-2'>
          <Image src='/padlock.png' alt='padlock' loading='lazy' height={30} width={30} />
          <input
            type='password'
            className='h-[2rem] w-[20rem] focus:outline-none p-2'
            placeholder='Nhập mã xác thực(OTP)'
            id='otp'
            name='otp'
          />
        </div>
        <button
          type='submit'
          className={`h-[2.5rem] w-[22rem] relative flex items-center justify-center rounded font-bold text-white text-xl  after:absolute after:left-[-5px] after:bottom-[-5px]
      after:border-dashed after:border-[1px]  after:border-yellow after:z-10 after:visible after:w-full  after:h-[2.3rem] after:rounded 
      after:hover:left-[0px] after:hover:bottom-[0px] after:hover:z-[-20]  bg-yellow	 animatie  col-span-2	 mx-[9rem] mt-[1rem]
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
      </form>
      <p className='text-black mt-4'>Chúng tôi đã gửi otp đến email : {email}</p>
      <button
        className='text-blue mt-2'
        onClick={e => {
          e.preventDefault();
          getOTP();
        }}
      >
        Nhấn để nhận lại
      </button>
    </div>
  );
};

export default CertaintUser;

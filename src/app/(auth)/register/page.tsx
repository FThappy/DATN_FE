'use client';

import React, { ChangeEvent, useState } from 'react';
import { Inter, Dancing_Script } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import CryptoJS from 'crypto-js';
import { InputUserRegister, UserRegister } from '@/utils/typeAuth';
import { sendOTP } from '@/actions/sendOTP';
const dancing = Dancing_Script({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });
import { useRouter } from 'next/navigation';
import { authStore } from '@/store/authStore';
import { Bounce, toast } from 'react-toastify';
import { checkValidGmail } from '@/utils/utilsEmail';
import { checkValidPhoneNumber } from '@/utils/utilsPhone';
import toastifyUtils from '../../../utils/toastify';

const RegisterPage = () => {
  const updateInforRegister = authStore((state: any) => state.updateInforRegister);
  const updateEmail = authStore((state: any) => state.updateEmail);
  const router = useRouter();
  const [inputs, setInputs] = useState<InputUserRegister>({
    username: '',
    email: '',
    password: '',
    rePassword: '',
    phone: '',
    address: '',
    type: '',
    birth: null
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
  };

  const handleRegister = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (
      !inputs.username ||
      !inputs.password ||
      !inputs.rePassword ||
      !inputs.address ||
      !inputs.type ||
      !inputs.birth ||
      !inputs.phone ||
      !inputs.email
    ) {
      return toast.warning('Vui lòng nhập đầy đủ thông tin', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce
      });
    }
    if (inputs.password !== inputs.rePassword) {
      return toast.warning('Nhập lại mật khẩu không chính xác', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce
      });
    }
    if (!checkValidGmail(inputs.email)) {
      return toastifyUtils('warning', 'Định dạnh email không hợp lệ');
    }
    if (!checkValidPhoneNumber(inputs.phone)) {
      return toast.warning('Định dạng phone không hợp lệ', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce
      });
    }
    const _password = CryptoJS.AES.encrypt(inputs.password, process.env.NEXT_PUBLIC_KEY_AES).toString();

    const dataSend: UserRegister = {
      username: inputs.username,
      email: inputs.email,
      password: _password,
      phone: inputs.phone,
      address: inputs.address,
      type: inputs.type,
      birth: inputs.birth!
    };
    try {
      const res = await sendOTP(inputs.email, 'register');
      updateInforRegister(dataSend);
      updateEmail(inputs.email);
      if (res && res.code === 2) {
        return toastifyUtils('warning', 'Định dạnh email không hợp lệ');
      }
      if (res && res.code === 3) {
        return toastifyUtils('warning', 'Tên đăng nhập đã tồn tại');
      }
      if (res && res.code === 6) {
        return toastifyUtils('warning', 'Email này đã được sử dụng');
      }
      router.push('/otp');
    } catch (error) {
      return toast.warning('Lỗi server', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce
      });
    }
  };

  return (
    <div className='flex flex-col w-[60%] items-center mt-8'>
      <p className={`${dancing.className} font-bold text-greenPrimary text-[5rem] mt-4 mb-2`}>Resgiter</p>
      <form className='grid grid-cols-2 gap-4'>
        <div>
          <label htmlFor='username' className='text-white text-[1.3rem]'>
            Tên đăng nhập
          </label>
          <div className='flex items-center bg-white rounded h-[2.5rem] w-[21rem] p-2 gap-2'>
            <Image src='/user.png' alt='user' loading='lazy' height={30} width={30} />
            <input
              type=' text'
              className='h-[2rem] w-[20rem] focus:outline-none'
              placeholder='Tên đăng nhập'
              id='username'
              name='username'
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor='email' className='text-white text-[1.3rem]'>
            Email cá nhân (Tổ chức)
          </label>
          <div className='flex items-center bg-white rounded h-[2.5rem] w-[21rem] p-2 gap-2'>
            <Image src='/user.png' alt='user' loading='lazy' height={30} width={30} />
            <input
              type=' text'
              className='h-[2rem] w-[20rem] focus:outline-none'
              placeholder='Tên email cá nhân hoặc tổ chức'
              id='email'
              name='email'
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor='password' className='text-white text-[1.3rem]'>
            Mật khẩu
          </label>
          <div className='flex items-center bg-white rounded h-[2.5rem] w-[21rem] p-2 gap-2'>
            <Image src='/padlock.png' alt='padlock' loading='lazy' height={30} width={30} />
            <input
              type='password'
              className='h-[2rem] w-[20rem] focus:outline-none'
              placeholder='Nhập mật khẩu'
              id='password'
              name='password'
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor='rePassword' className='text-white text-[1.3rem]'>
            Nhập lại mật khẩu
          </label>
          <div className='flex items-center bg-white rounded h-[2.5rem] w-[21rem] p-2 gap-2'>
            <Image src='/padlock.png' alt='padlock' loading='lazy' height={30} width={30} />
            <input
              type='password'
              className='h-[2rem] w-[20rem] focus:outline-none'
              placeholder='Nhập lại mật khẩu'
              id='rePassword'
              name='rePassword'
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor='phone' className='text-white text-[1.3rem]'>
            Số điện thoại
          </label>
          <div className='flex items-center bg-white rounded h-[2.5rem] w-[21rem] p-2 gap-2'>
            <Image src='/telephone.png' alt='telephone' loading='lazy' height={30} width={30} />
            <input
              type='text'
              className='h-[2rem] w-[20rem] focus:outline-none'
              placeholder='Nhập số điện thoại cá nhân hoặc tổ chức'
              id='phone'
              name='phone'
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor='address' className='text-white text-[1.3rem]'>
            Địa chỉ
          </label>
          <div className='flex items-center bg-white rounded h-[2.5rem] w-[21rem] p-2 gap-2'>
            <Image src='/pindark.png' alt='pindark' loading='lazy' height={30} width={30} />
            <input
              type='text'
              className='h-[2rem] w-[20rem] focus:outline-none'
              placeholder='Nhập địa chỉ cá nhân hoặc tổ chức'
              id='address'
              name='address'
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor='type' className='text-white text-[1.3rem]'>
            Lựa chọn
          </label>
          <div className='flex items-center bg-white rounded h-[2.5rem] w-[21rem] p-2 gap-2'>
            <select
              name='type'
              id='type'
              className='h-[2rem] w-[20rem] focus:outline-none'
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                setInputs(prev => {
                  return {
                    ...prev,
                    [e.target.name]: e.target.value
                  };
                });
              }}
            >
              <option value='null'></option>
              <option value='person'>Cá nhân</option>
              <option value='organization'>Tổ chức</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor='birth' className='text-white text-[1.3rem]'>
            Ngày sinh (Ngày thành lập)
          </label>
          <div className='flex items-center bg-white rounded h-[2.5rem] w-[21rem] p-2 gap-2'>
            <Image src='/calendar.png' alt='calendar' loading='lazy' height={30} width={30} />
            <input
              type='date'
              className='h-[2rem] w-[20rem] focus:outline-none'
              placeholder='Nhập ngày sinh hoặc ngày thành lập tổ chức'
              name='birth'
              id='birth'
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          type='submit'
          className={`h-[2.5rem] w-[25rem] relative flex items-center justify-center rounded font-bold text-white text-xl  after:absolute after:left-[-5px] after:bottom-[-5px]
      after:border-dashed after:border-[1px]  after:border-red after:z-10 after:visible after:w-full  after:h-[2.3rem] after:rounded 
      after:hover:left-[0px] after:hover:bottom-[0px] after:hover:z-[-20]  bg-red	 animatie  col-span-2	 mx-[9rem] mt-[1rem]
      `}
          onClick={handleRegister}
        >
          Đăng ký
        </button>
      </form>
      <p className='text-white text-center mt-[3rem]'>Bạn đã có tài khoản?</p>
      <Link href='/login' className='text-blue text-center text-[1.2rem]'>
        Đăng nhập
      </Link>
    </div>
  );
};

export default RegisterPage;

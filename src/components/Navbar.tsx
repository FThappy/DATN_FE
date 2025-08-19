'use client';
import { Inter, Dancing_Script } from 'next/font/google';
import Image from 'next/image';
import React from 'react';
import { menu } from '../lib/placeholder-data';
import Link from 'next/link';
import { userStore } from '@/store/userStore';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import toastifyUtils from '../utils/toastify';
import { logout } from '@/actions/logout';
import { MdEventAvailable } from 'react-icons/md';
import MessengerTopBar from './MessengerTopBar';
import Notification from './Notification';
import { socket } from '@/utils/requestMethod';
import { boxChatStore } from '@/store/boxChatStore';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';

const dancing = Dancing_Script({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

const Navbar = () => {
  const user = userStore((state: any) => state?.user);
  const deleteUser = userStore((state: any) => state?.deleteUser);
  const deleteAll = boxChatStore((state: any) => state?.deleteAll);
  const pathname = usePathname();
  console.log(pathname);
  const handleLogout = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const res = await logout();
      if (res && res.code === 4) {
        return toastifyUtils('warning', 'Không xác thực');
      }
      deleteUser();
      deleteAll();
      socket.close();
    } catch (error) {
      console.log(error);
      return toastifyUtils('error', 'Lỗi server');
    }
  };
  const underline: React.CSSProperties = {
    position: 'absolute',
    bottom: -10,
    left: 0,
    right: 0,
    height: 2,
    background: '#16a34a'
  };
  return (
    <div className='flex px-8 bg-white w-screen h-24 items-center justify-between sticky top-0 z-[99]'>
      <div className='flex justify-center items-center '>
        <Image src='/logo.png' alt='logo' loading='lazy' height={180} width={180} />
        <h1 className={`absolute ${dancing.className} font-bold text-4xl text-lime-500 z-10 left-[160px]`}>
          Chung Tay
        </h1>
      </div>
      <div className='flex gap-4 w-3/4 items-center justify-end'>
        {menu.map((item, index) => (
          <Link
            href={item.url}
            key={index}
            className={`font-normal text-2xl ${item.url === pathname ? 'text-green-600' : 'text-slate-800'}`}
          >
            <motion.div className='relative inline-block px-1'>
              <span>{item.name}</span>
              {item.url === pathname && (
                <motion.div
                  style={underline}
                  layoutId='underline'
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </motion.div>
          </Link>
        ))}
        <div className='h-[24px] w-[1px] border-r-2 border-slate-500	'></div>
        {user ? (
          <div className='flex gap-2 items-center'>
            {pathname !== '/message' && <MessengerTopBar />}
            <Notification />
            <Popover>
              <PopoverTrigger asChild>
                <div className='h-[60px] cursor-pointer flex items-center gap-2'>
                  <div className='w-[60px] h-[60px]'>
                    <Image
                      src={user?.img ? user?.img : '/twitter.png'}
                      alt='logo-user'
                      loading='lazy'
                      height={60}
                      width={60}
                      className='cursor-pointer rounded-full w-full h-full'
                    />
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className='mr-4 w-[25rem] z-[100]'>
                <div className='p-2 shadow-beautiful rounded-[0.5rem]	'>
                  {' '}
                  <Link href={`/profile/${user?.id}`}>
                    <div className='w-full h-[60px] cursor-pointer flex items-center gap-2 hover:bg-gray-100 p-2 rounded-[0.8rem]'>
                      <div className='w-[50px] h-[50px]'>
                        <Image
                          src={user?.img ? user?.img : '/twitter.png'}
                          alt='logo-user'
                          loading='lazy'
                          height={50}
                          width={50}
                          className='cursor-pointer rounded-full  h-full'
                        />
                      </div>

                      <p className='font-normal text-[1.5rem] text-slate-800 mr-[1rem]'>
                        {user?.displayName ? user?.displayName : user.username}
                      </p>
                    </div>
                  </Link>
                  <div className='w-full border-b-2 border-gray-300	mt-2 mb-2	'></div>
                  <Link href={`/profile/${user?.id}`}>
                    <button className='text-sky-400 text-[1rem] hover:bg-gray-100 p-2 rounded-[0.8rem] w-full text-left border-none outline-none'>
                      Xem trang cá nhân
                    </button>
                  </Link>
                </div>
                <Link
                  href={`/profile/change-info`}
                  className='w-full h-[50px] cursor-pointer flex items-center gap-2 hover:bg-gray-100 p-2 rounded-[0.8rem] mt-2 '
                >
                  <div className='w-[40px] h-[40px] rounded-full p-2 bg-gray-300 flex justify-center items-center'>
                    <Image
                      src='/gear.png'
                      alt='gear'
                      loading='lazy'
                      height={30}
                      width={30}
                      className='cursor-pointer  h-full'
                    />
                  </div>
                  <p className='font-bold text-[1.2rem] text-black'>Cài đặt & quyền riêng tư</p>
                </Link>
                <Link
                  href={'/profile/event-owner?page=0'}
                  className='w-full h-[50px] cursor-pointer flex items-center gap-2 hover:bg-gray-100 p-2 rounded-[0.8rem] mt-2 '
                >
                  <div className='w-[40px] h-[40px] rounded-full p-2 bg-gray-300 flex justify-center items-center'>
                    <MdEventAvailable size={24} />
                  </div>
                  <p className='font-bold text-[1.2rem] text-black'>Sự kiện của bạn</p>
                </Link>
                <button
                  className='w-full h-[50px] cursor-pointer flex items-center gap-2 hover:bg-gray-100 p-2 rounded-[0.8rem] mt-2 '
                  onClick={handleLogout}
                >
                  <div className='w-[40px] h-[40px] rounded-full p-2 bg-gray-300 flex justify-center items-center'>
                    <Image
                      src='/logout.png'
                      alt='logout'
                      loading='lazy'
                      height={30}
                      width={30}
                      className='cursor-pointer  h-full'
                    />
                  </div>
                  <p className='font-bold text-[1.2rem] text-black'>Đăng xuất</p>
                </button>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <>
            <Link
              href={'/login'}
              className={`h-[55px] w-[120px] bg-greenPrimary rounded flex justify-center items-center font-bold text-white text-[1.2rem] ${inter.className}	`}
            >
              Đăng Nhập
            </Link>
            <Link
              href={'/register'}
              className={`h-[55px] w-[120px] bg-red rounded flex justify-center items-center font-bold text-white text-[1.2rem]  ${inter.className}	`}
            >
              Đăng Ký
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

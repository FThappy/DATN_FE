'use client';

import React, { useState, useEffect } from 'react';
import NavProfile from './NavProfile';
import { User } from '@/utils/typeAuth';
import { getUser } from '@/actions/getUser';
import { notFound } from 'next/navigation';
import Info from './Info';
import ListPostProfile from './ListPostProfile';

type Props = {
  id: string;
};

const Profile = (props: Props) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await getUser(props.id);
        if (res.code === 3) {
          return notFound();
        }
        if (res.code === 4) {
          throw new Error('Server Error');
        }
        setUser(res.data);
      } catch (error) {
        throw new Error('Server Error');
      }
    };
    getUserData();
  }, [props.id]);

  return (
    <>
      {user && <NavProfile user={user} setUser={setUser} />}
      <div className='flex gap-2 pl-[4rem] mt-4 desktop:pl-[8rem] laptop:pl-[4rem]'>
        <div>{user && <Info user={user} />}</div>
        {user && <ListPostProfile user={user} />}
      </div>
    </>
  );
};

export default Profile;

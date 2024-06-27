"use client"
import SidebarLeft from '@/components/social/SidebarLeft'
import SidebarRight from '@/components/social/SidebarRight'
import React from 'react'
import SocialMain from '@/components/social/SocialMain'
import { userStore } from '@/store/userStore'


const page = () => {
  const user = userStore((state: any) => state?.user);
  return (
    <div className="bg-[#f1eff4d1] w-full p-2 flex pt-6 justify-center ">
      {user && <SidebarLeft />}
      <SocialMain />
      {user && <SidebarRight />}
    </div>
  );
}

export default page
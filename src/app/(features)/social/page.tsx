import Main from '@/components/social/SocialMain'
import SidebarLeft from '@/components/social/SidebarLeft'
import SidebarRight from '@/components/social/SidebarRight'
import React from 'react'
import SocialMain from '@/components/social/SocialMain'


const page = () => {
  return (
    <div className='bg-[#f1eff4d1] w-full p-2 flex pt-6  '>
      <SidebarLeft/>
      <SocialMain/>
      <SidebarRight/>
    </div>
  )
}

export default page
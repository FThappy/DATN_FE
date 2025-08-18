import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Sidebar from './Sidebar';
import ModalCreateEvent from '@/components/event/ModalCreateEvent';

export default function EventUserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-[#f1eff4d1] w-full h-auto    '>
      <div className='border-slate-200 w-full h-[1px] border-b-[1px]'></div>
      <div className='flex relative w-full'>
        <Sidebar />
        {children}
      </div>
    </div>
  );
}

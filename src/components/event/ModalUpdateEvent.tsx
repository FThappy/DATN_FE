import React, { ChangeEvent, useState } from 'react';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '../ui/dialog';
import FormInputDateEvent from './FormInputDateEvent';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import { MdDeleteOutline } from 'react-icons/md';
import { LuImagePlus } from 'react-icons/lu';
import { CiCircleRemove } from 'react-icons/ci';
import { IoCreateOutline } from 'react-icons/io5';
import toastifyUtils from '@/utils/toastify';
import { useRouter } from 'next/navigation';
import { cityDummy } from '@/lib/placeholder-data';
import { EventProps } from '@/utils/typeEvent';
import { userStore } from '@/store/userStore';
import { BiSolidPencil } from 'react-icons/bi';
import { updateEvent } from '@/actions/updateEvent';
import { isEqual } from 'date-fns';

type Props = {
  event: EventProps;
  setEvent: React.Dispatch<React.SetStateAction<EventProps | undefined>>;
};

const ModalUpdateEvent = (props: Props) => {
  const { event, setEvent } = props;

  const [eventPre, setEventPre] = useState<EventProps>(event);

  const user = userStore((state: any) => state?.user);

  const router = useRouter();

  const today = new Date();

  const [open, setOpen] = useState(false);

  const [dateStart, setDateStart] = React.useState<Date>(new Date(eventPre.timeStart));

  const [timeStart, setTimeStart] = useState<number>(new Date(eventPre.timeStart).getTime());

  const [timeEnd, setTimeEnd] = useState<number>(new Date(eventPre.timeEnd).getTime());

  const [dateEnd, setDateEnd] = React.useState<Date>(new Date(eventPre.timeEnd));

  const [eventName, setEventName] = useState<string>(eventPre.eventName);

  const [city, setCity] = useState<string>(eventPre.city);

  const [address, setAddress] = useState<string>(eventPre.address);

  const [description, setDescription] = useState<string>(eventPre.description);

  const [pending, setPending] = useState(false);

  const [imgWall, setImgWall] = useState<(string | File)[]>(event.wallImg);

  const [files, setFiles] = useState<File[]>([]);

  const [fileRemove, setFileRemove] = useState<string[]>([]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPending(true);
    try {
      if (
        eventName === eventPre.eventName &&
        isEqual(dateStart, new Date(event.timeStart)) &&
        isEqual(dateEnd, new Date(event.timeEnd)) &&
        city === eventPre.city &&
        address === eventPre.address &&
        description === eventPre.description &&
        files.length === 0 &&
        fileRemove.length === 0
      ) {
        setPending(false);
        return toastifyUtils('warning', 'Thông tin không có gi thay đổi');
      }
      if (dateStart <= new Date() && !isEqual(dateStart, new Date(event.timeStart))) {
        setPending(false);
        return toastifyUtils('warning', 'Ngày bắt đầu và kết thúc không hợp lệ 1');
      }
      if (dateStart >= dateEnd) {
        setPending(false);
        return toastifyUtils('warning', 'Ngày bắt đầu và kết thúc không hợp lệ');
      }
      const formData = new FormData();
      if (eventName !== eventPre.eventName) {
        formData.append('eventName', eventName);
      }
      if (dateStart !== new Date(eventPre.timeStart)) {
        formData.append('timeStart', dateStart.toString());
      }
      if (dateEnd !== new Date(eventPre.timeEnd)) {
        formData.append('timeEnd', dateEnd.toString());
      }
      if (city !== eventPre.city) {
        formData.append('city', city);
      }
      if (address !== eventPre.address) {
        formData.append('address', address);
      }
      if (description !== eventPre.description) {
        formData.append('description', description);
      }
      if (files.length > 0) {
        files.forEach(file => {
          formData.append('file', file); // Sử dụng cùng một tên "files[]" cho tất cả các file
        });
      }
      if (fileRemove.length > 0) {
        formData.append('imageRemove', JSON.stringify(fileRemove));
      }
      const res = await updateEvent(formData, event._id);
      setPending(false);
      if (res.code === 1) {
        return toastifyUtils('warning', 'Hiện chỉ hỗ trợ file ảnh');
      }
      if (res.code === 2) {
        return toastifyUtils('warning', 'Không tồn tại sự kiện');
      }
      if (res.code === 4) {
        return toastifyUtils('error', 'Lỗi server');
      }
      toastifyUtils('success', 'Sửa sự kiện thành công');
      setOpen(false);
      setEvent(prev => res.event);
      setEventPre(res.event);
      setFileRemove([]);
      setFiles([]);
    } catch (error) {
      console.log(error);
      setPending(false);
      return toastifyUtils('error', 'Lỗi server');
    }
  };
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const fileList = e.target.files;
    const fileArray = Array.from(fileList!);
    setFiles(prevFiles => [...(prevFiles || []), ...fileArray]);
    setImgWall(prevFiles => [...(prevFiles || []), ...fileArray]);
    e.target.value = '';
  };

  const removeFile = (index: number) => {
    if (typeof imgWall[index] === 'string') {
      setFileRemove(prev => [...prev, imgWall[index] as string]);
    } else {
      setFiles(prevFiles => {
        const newFiles = [...prevFiles];
        newFiles.splice(index - imgWall.length, 1);
        return newFiles;
      });
    }
    setImgWall(prevFiles => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };
  const removeAll = () => {
    setImgWall([]);
    setFiles([]);
    setFileRemove(prev => [...prev, ...event.wallImg]);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className=''>
          <div className='h-[3rem]  flex items-center p-2 px-4 gap-2 bg-gray-200 hover:bg-gray-300 rounded-[8px] '>
            <BiSolidPencil size={24} />
            <p className='font-bold text-[1.1rem]'>Chỉnh sửa sự kiện</p>
          </div>
        </DialogTrigger>
        <DialogContent
          className='w-[40rem] h-auto shadow-beautiful rounded-[0.5rem]	bg-white p-0 m-0 gap-0'
          // onInteractOutside={(e) => e.preventDefault()}
        >
          <div className='p-2 pt-4 flex items-center w-full justify-center relative'>
            <p className='text-[1.5rem] font-bold'>Chỉnh sửa sự kiện</p>
            <button
              className='flex items-center justify-center bg-[#E8E5ED] rounded-full w-[50px] 
          h-[50px] absolute right-2 cursor-pointer'
            >
              <DialogClose asChild>
                <div className='flex items-center justify-center w-[30px] h-[30px]'>
                  <Image
                    src='/reject.png'
                    alt='logo-user'
                    loading='lazy'
                    height={10}
                    width={30}
                    className=' rounded-full  h-full'
                  />
                </div>
              </DialogClose>
            </button>
          </div>
          <div className='border-slate-400 w-full h-[1px] border-b-[1px]'></div>
          {imgWall.length > 0 ? (
            <Carousel>
              <CarouselContent className='w-full h-[15rem] ml-0 pl-0'>
                {imgWall.map((file, index) => (
                  <CarouselItem key={index} className='ml-0 pl-0 relative'>
                    <img
                      src={typeof file === 'string' ? file : URL.createObjectURL(file)}
                      alt='image'
                      className='w-full h-full  cursor-pointer '
                    />
                    <button
                      className='absolute top-2 right-2  cursor-pointer  flex items-center justify-center w-[30px] h-[30px]  rounded-full'
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        removeFile(index);
                      }}
                    >
                      <CiCircleRemove color='white' size={32} className='bg-black/40 rounded-full w-[30px] h-[30px]' />
                    </button>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {imgWall.length > 1 ? (
                <>
                  <CarouselPrevious className='left-4' />
                  <CarouselNext className='right-4' />
                </>
              ) : (
                <></>
              )}
              <div className='absolute bottom-4 right-4 flex items-center justify-center gap-2'>
                {' '}
                <label htmlFor='file'>
                  <div className=' flex items-center justify-center bg-black/40 hover:bg-black/75 w-[120px] h-[40px] gap-1 rounded-[8px] cursor-pointer p-2'>
                    <LuImagePlus color='white' size={24} />
                    <p className='font-bold text-white'>Thêm ảnh</p>
                  </div>
                </label>
                <input id='file' name='file' type='file' className='hidden' multiple onChange={handleChangeFile} />
                <button
                  className=' flex items-center justify-center bg-black/40 hover:bg-black/75 w-[120px] h-[40px] gap-1 rounded-[8px] cursor-pointer p-2'
                  onClick={removeAll}
                >
                  <MdDeleteOutline color='white' size={24} />
                  <p className='font-bold text-white'>Gỡ tất cả</p>
                </button>
              </div>
            </Carousel>
          ) : (
            <div className='bg-gray-200 w-full h-[15rem] relative'>
              <label htmlFor='file'>
                <div className='absolute bottom-4 right-4 flex items-center justify-center bg-black/60 hover:bg-black/75 w-[120px] h-[45px] gap-1 rounded-[8px] cursor-pointer p-2'>
                  <LuImagePlus color='white' size={24} />
                  <p className='font-bold text-white'>Thêm ảnh</p>
                </div>
              </label>
              <input id='file' name='file' type='file' className='hidden' multiple onChange={handleChangeFile} />
            </div>
          )}
          <div className='w-full h-[60px] cursor-pointer flex items-center gap-2 p-2 px-4  mb-1'>
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
            <div className='flex flex-col '>
              <p className='font-bold text-[1.3rem] text-slate-800 mr-[1rem]'>{user?.username}</p>
              <p className='text-gray-300'>Người tổ chức</p>
            </div>
          </div>
          <form className='px-4 flex flex-col items-center  overflow-y-scroll max-h-[18rem]'>
            <input
              type='text'
              name='nameEvent'
              id='nameEvent'
              placeholder='Tên sự kiện ....'
              className='p-2  rounded-[8px] w-full border-2 border-gray-400'
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setEventName(e.target.value);
              }}
              value={eventName}
            />
            <FormInputDateEvent
              date={dateStart}
              setDate={setDateStart}
              time={timeStart}
              setTime={setTimeStart}
              detail='Ngày bắt đầu'
            />
            <FormInputDateEvent
              date={dateEnd}
              setDate={setDateEnd}
              time={timeEnd}
              setTime={setTimeEnd}
              detail='Ngày kết thúc'
            />

            <select
              className='flex border-2 w-full border-gray-400 items-center justify-center gap-2 rounded-[12px] p-2 mt-2'
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                setCity(e.target.value);
              }}
              defaultValue={city}
            >
              {cityDummy.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            <input
              type='text'
              name='address'
              id='address'
              placeholder='Địa điểm cụ thể.....'
              className='p-2  rounded-[8px] w-full border-2 border-gray-400 mt-2'
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setAddress(e.target.value);
              }}
              value={address}
            />
            <textarea
              placeholder='Hãy mô tả chi tiết về sự kiện'
              className='p-2  rounded-[8px] w-full border-2 border-gray-400 mt-2 max-h-[8rem] min-h-[8rem]'
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                setDescription(e.target.value);
              }}
              value={description}
            />
          </form>
          <div className='border-slate-400 w-full h-[1px] border-b-[1px] mt-1'></div>
          <div className='px-4 flex flex-col items-center shadow-beautiful bg-white  w-full rounded-b-[8px] '>
            <button
              type='submit'
              className='h-[40px] w-[98%] mr-4 mb-2 mt-2 bg-greenPrimary rounded flex justify-center shadow-beautiful items-center font-bold text-white text-[1.2rem] cursor-pointer'
              disabled={
                eventName === eventPre.eventName &&
                isEqual(dateStart, new Date(event.timeStart)) &&
                isEqual(dateEnd, new Date(event.timeEnd)) &&
                city === eventPre.city &&
                address === eventPre.address &&
                description === eventPre.description &&
                event.userId === user.id &&
                files.length === 0 &&
                fileRemove.length === 0 &&
                JSON.stringify(event.wallImg) === JSON.stringify(imgWall)
              }
              style={{
                backgroundColor:
                  eventName === eventPre.eventName &&
                  isEqual(dateStart, new Date(event.timeStart)) &&
                  isEqual(dateEnd, new Date(event.timeEnd)) &&
                  city === eventPre.city &&
                  address === eventPre.address &&
                  description === eventPre.description &&
                  files.length === 0 &&
                  fileRemove.length === 0 &&
                  event.userId === user.id
                    ? '#F84D42'
                    : '#20b86d'
              }}
              onClick={handleSubmit}
            >
              {pending ? (
                <>
                  <p>Loading</p>
                  <div className='loader'></div>
                </>
              ) : (
                'Lưu sự kiện'
              )}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModalUpdateEvent;

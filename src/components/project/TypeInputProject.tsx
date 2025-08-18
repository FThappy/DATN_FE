import React, { KeyboardEventHandler, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { typeProjectDefault } from '@/lib/placeholder-data';
import { IoIosSend } from 'react-icons/io';
import toastifyUtils from '@/utils/toastify';
import { CiCircleRemove } from 'react-icons/ci';

type Props = {
  type: string[];
  setType: React.Dispatch<React.SetStateAction<string[]>>;
};

const TypeInputProject = (props: Props) => {
  const { type, setType } = props;

  const [otherType, setOtherType] = useState<string>();

  const [isActive, setIsActive] = useState<boolean[]>([]);

  const handleAddType = (value: string) => {
    if (value) {
      setType(prev => [value, ...prev]);
    } else {
      return toastifyUtils('warning', 'Hãy nhập giá trị');
    }
  };
  const handleRemoveType = (index: number) => {
    setType(prev => {
      const newPrev = [...prev];
      newPrev.splice(index, 1);
      return newPrev;
    });
    if (typeProjectDefault.includes(type[index])) {
      setIsActive(prev => {
        prev[typeProjectDefault.findIndex(item => item === type[index])] = false;
        return prev;
      });
    }
  };
  const handleNonActive = (value: string) => {
    setType(prev => {
      const newPrev = [...prev];
      newPrev.splice(
        newPrev.findIndex(item => item === value),
        1
      );
      return newPrev;
    });
  };

  return (
    <Accordion type='single' collapsible className='w-full'>
      <AccordionItem value='item-1'>
        <AccordionTrigger
          className='p-2 w-[55rem] min-h-[2rem] outline-none 
          px-3 border border-gray-400 rounded-[8px] bg-white flex-wrap '
        >
          <div className='flex flex-wrap items-center w-[90%] gap-2'>
            {type.length > 0
              ? type.map((item, index) => (
                  <div key={index} className=' h-[2rem] relative'>
                    <p className='bg-gray-200 rounded-[10px] p-2'>{item}</p>
                    <div
                      className='absolute top-[-2px] right-[-2px] bg-white rounded-full'
                      onClick={e => {
                        e.preventDefault();
                        handleRemoveType(index);
                      }}
                    >
                      <CiCircleRemove color='black' />
                    </div>
                  </div>
                ))
              : ' Chọn thể loại dự án'}
          </div>
        </AccordionTrigger>
        <AccordionContent
          className='p-2 w-[55rem] h-[8rem] outline-none 
          px-3 border border-gray-400 rounded-[8px] mt-2 bg-white flex flex-col'
        >
          <div className='flex gap-1 w-full'>
            {typeProjectDefault.map((item, index) => (
              <div
                key={index}
                onClick={e => {
                  e.preventDefault();
                  if (isActive[index]) {
                    handleNonActive(item);
                    setIsActive(prev => {
                      prev[index] = false;
                      return prev;
                    });
                  } else {
                    handleAddType(item);
                    setIsActive(prev => {
                      prev[index] = true;
                      return prev;
                    });
                  }
                }}
              >
                <p className={`${isActive[index] ? 'bg-sky-400' : 'bg-gray-200'} rounded-[10px] p-2`}>{item}</p>
              </div>
            ))}
          </div>
          <div
            className=' w-[53rem] h-[3rem] outline-none 
          border border-gray-400 rounded-[8px] p-2 mt-4 bg-white flex gap-2 items-center'
          >
            <input
              type='text'
              className=' w-[50rem] h-[2rem] outline-none 
          px-3  bg-white rounded-[8px]'
              placeholder='Nếu khác hãy nhập........'
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddType(e.currentTarget.value);
                  e.currentTarget.value = '';
                  setOtherType('');
                }
              }}
              onChange={e => setOtherType(e.target.value)}
              value={otherType}
            />
            <button
              disabled={!otherType}
              onClick={e => {
                e.preventDefault();
                handleAddType(otherType!);
                setOtherType('');
              }}
            >
              <IoIosSend color='teal' size={24} />
            </button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default TypeInputProject;

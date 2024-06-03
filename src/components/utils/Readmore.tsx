"use client"
import React,{useState} from 'react'


const Readmore = ({ documentation }: { documentation: string }) => {
  const [active, setActive] = useState(false);
  return (
    <p className="w-full p-2">
      {documentation?.length > 250 ? (
        active ? (
          <>
            {documentation}
            <button
              className="font-bold text-[1.2rem] hover:underline	cursor:pointer"
              onClick={() => setActive(false)}
            >
              Thu gọn
            </button>
          </>
        ) : (
          <>
            {documentation.slice(0, 250)}...
            <button
              className="font-bold text-[1.2rem] hover:underline	cursor:pointer"
              onClick={() => setActive(true)}
            >
              Xem thêm
            </button>
          </>
        )
      ) : (
        documentation
      )}
    </p>
  );
};

export default Readmore
import React from 'react';
import Image from 'next/image';

const IconMove = ({ width, top, left }: { width: number; top: string; left: string }) => {
  return (
    <div>
      <Image
        src='/three-round-green.webp'
        alt='three-round-green'
        loading='lazy'
        height={10}
        width={width}
        className='absolute z-50 animate-icon-move'
        style={{
          left: `${left}`,
          top: `${top}`
        }}
      />
    </div>
  );
};

export default IconMove;

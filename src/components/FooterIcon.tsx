
import Image from 'next/image';
import React from 'react'


const FooterIcon = () => {
  return (
    <div className="mt-8 flex items-center gap-6">
      <Image
        src="/facebook.png"
        alt="logo-facebook"
        loading="lazy"
        height={50}
        width={50}
        className="cursor-pointer"
      />
      <Image
        src="/twitter.png"
        alt="logo-twitter"
        loading="lazy"
        height={50}
        width={50}
        className="cursor-pointer"
      />
      <Image
        src="/google.png"
        alt="logo-google"
        loading="lazy"
        height={50}
        width={50}
        className="cursor-pointer"
      />
      <Image
        src="/linkedin.png"
        alt="logo-linkedin"
        loading="lazy"
        height={50}
        width={50}
        className="cursor-pointer"
      />
    </div>
  );
}

export default FooterIcon
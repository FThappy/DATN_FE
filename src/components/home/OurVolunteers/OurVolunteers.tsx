"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "./ourVolunteers.css";

import { Inter, Dancing_Script } from "next/font/google";
import TextUnderline from "../../utils/TextUnderline";
import { volunteers } from "@/lib/placeholder-data";
import { UserPublic } from "@/utils/typeAuth";
import { getUserLike } from "@/actions/getUserLike";
import toastifyUtils from "@/utils/toastify";
import Link from "next/link";
const dancing = Dancing_Script({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });
const colors = ["#20b86d", "#F84D42", "#FFB840"];
const bottom = ["/valunteer-green.jpg", "/valunteer-red.jpg", "/valunteer-yellow.jpg"];
type ItemProps = {
  user: UserPublic;
  totalLike: number;
};
const OurVolunteers = () => {

    const [listUser, setListUser] = useState<ItemProps[]>([]);

    useEffect(() => {
      const getItem = async () => {
        try {
          const res = await getUserLike(3);
          if (res.code === 0) {
            setListUser(res.data);
          }
        } catch (error) {
          console.log(error);
          return toastifyUtils("error", "Lỗi server");
        }
      };
      getItem();
    }, []);
  return (
    <div className="w-full  h-[850px] bg-slate-50 flex flex-col justify-center items-center">
      <p className={`${dancing.className} font-bold text-red text-4xl mb-4 `}>
        Những nhà hảo tâm
      </p>
      <p
        className={`${inter.className} font-bold text-slate-800 text-4xl  mb-8`}
      >
        Gặp gỡ
        <TextUnderline
          chilldren=" nhà hảo tâm"
          width={300}
          top="2.3rem"
          left="0.6rem"
        />
      </p>
      <p
        className={`${inter.className}  text-neutral-800  w-[40rem] text-[1.3rem] text-center mb-8`}
      >
        Những nhà hảo tâm nổi bât có tấm lòng nhân ái và hoạt động từ thiện tích
        cực, đã đóng góp một phần không nhỏ vào sự phát triển và cải thiện đời
        sống của cộng đồng.
      </p>
      <div className="w-full flex justify-center gap-4">
        {listUser &&
          listUser.length > 0 &&
          listUser.map((item, index) => (
            <div key={index}>
              <div
                className="h-[400px] w-[384px] bg-cover "
                style={{
                  backgroundImage: `${item.user.img ? `url(${item.user.img}) `: `url(/valunteer1.webp)`}`,
                }}
              >
                <div
                  className="w-full h-full flex items-end  cursor-pointer volunteer"
                  style={{
                    "--color": `${colors[index]}`,
                  }}
                >
                  <Link href={`/profile/${item.user._id}`}
                    className="h-[80px] w-[80px] flex justify-center items-center "
                    style={{
                      background: `${colors[index]}`,
                    }}
                  >
                    <Image
                      src="/link.png"
                      alt="link"
                      loading="lazy"
                      height={40}
                      width={40}
                    />
                  </Link>
                </div>
              </div>
              <div
                className="h-[150px] w-[384px] bg-cover rounded-b-[12px] mt-8 flex flex-col items-center justify-center"
                style={{
                  backgroundImage: `url(${bottom[index]})`,
                }}
              >
                <p className="text-center text-[2rem] font-bold text-white">
                  {item.user.displayname ? item.user.displayname : item.user.username}
                </p>
                <p className="text-center text-[1.5rem]  text-white ">
                  Nhà hảo tâm
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OurVolunteers;

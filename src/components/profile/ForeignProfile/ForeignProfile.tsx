"use client"
import React, { useState, useEffect } from "react";
import { User } from "@/utils/typeAuth";
import { getUser } from "@/actions/getUser";
import { notFound } from "next/navigation";
import NavForeignProfile from "./NavForeignProfile";
import InfoForeign from "./InfoForeign";
import ListPostForeign from "./ListPostForeign";

type Props = {
  id: string;
};

const ForeignProfile = (props: Props) => {

  const [user, setUser] = useState<User>();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await getUser(props.id);
        if (res.code === 3) {
          return notFound();
        }
        if (res.code === 4) {
          throw new Error("Server Error");
        }
        setUser(res.data);
      } catch (error) {
        throw new Error("Server Error");
      }
    };
    getUserData();
  }, [props.id]);


    
  return (
    <>
      {user && <NavForeignProfile user={user} />}
      <div className="flex gap-2 pl-[4rem] mt-4 desktop:pl-[8rem] laptop:pl-[4rem]">
        <div>{user && <InfoForeign user={user} />}</div>
        {user && <ListPostForeign user={user} />}
      </div>
    </>
  );
}

export default ForeignProfile
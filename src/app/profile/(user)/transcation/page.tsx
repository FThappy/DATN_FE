"use client";
import React, { Suspense } from "react";
import TranscationUser from "./TranscationUser";

type Props = {};

const page = (props: Props) => {

  return (
    <div className="w-5/6">
      <Suspense fallback={<div>Loading...</div>}>
        <TranscationUser />
      </Suspense>
    </div>
  );
};

export default page;

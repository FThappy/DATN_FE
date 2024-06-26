"use client";
import React, { Suspense } from "react";
import ProjectOwner from "./ProjectOwner";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="w-5/6">
      <Suspense fallback={<div>Loading...</div>}>
        <ProjectOwner />
      </Suspense>
    </div>
  );
};

export default page;

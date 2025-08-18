// "use server";
// import { userRequest } from "@/utils/requestMethod";
// import { cookies } from "next/headers";

// export const getTotalPageUserJoinEvent = async () => {
//   const cookie = cookies().get("Authorization");

//   try {
//     const res = await userRequest.get("/api/event/user-event/total-page", {
//       headers: {
//         "Content-Type": "application/json",
//         Cookie: `Authorization=${cookie?.value}`,
//       },
//     });
//     return res.data;
//   } catch (error: any) {
//     console.log(error);
//     return error.response.data;
//   }
// };

import { userRequest } from '@/utils/requestMethod';

export const getTotalPageUserJoinEvent = async () => {
  try {
    const res = await userRequest.get('/api/event/user-event/total-page', {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};

// "use server";

// import { userRequest } from "@/utils/requestMethod";
// import { cookies } from "next/headers";

// export const getPostByUserId = async (page: number,userId : string) => {
//   const cookie = cookies().get("Authorization");
//   try {
//     const res = await userRequest.get(`/api/post/${userId}`, {
//       headers: {
//         "Content-Type": "application/json",
//         Cookie: `Authorization=${cookie?.value}`,
//       },
//       params: {
//         page: page,
//       },
//     });
//     return res.data;
//   } catch (error: any) {
//     console.log(error);
//     return error.response.data;
//   }
// };


import { userRequest } from "@/utils/requestMethod";

export const getPostByUserId = async (page: number, userId: string) => {
  try {
    const res = await userRequest.get(`/api/post/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        page: page,
      },
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};
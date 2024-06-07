// "use server";

// import { userRequest } from "@/utils/requestMethod";
// import { cookies } from "next/headers";

// export const deletePost = async (userId : string, postId : string) => {
//   const cookie = cookies().get("Authorization");
//   try {
//     const res = await userRequest.delete("/api/post", {
//       headers: {
//         "Content-Type": "application/json",
//         Cookie: `Authorization=${cookie?.value}`,
//       },
//       params: {
//         userId: userId,
//         postId: postId,
//       },
//     });
//     return res.data;
//   } catch (error: any) {
//     console.log(error);
//     return error.response.data;
//   }
// };


import { userRequest } from "@/utils/requestMethod";

export const deletePost = async (userId : string, postId : string) => {
  try {
    const res = await userRequest.delete("/api/post", {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        userId: userId,
        postId: postId,
      },
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};
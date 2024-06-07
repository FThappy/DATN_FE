// "use server";
// import { cookies } from "next/headers";
// import { userRequest } from "@/utils/requestMethod";

// export const updatePost = async (formData: FormData, postId : string, userId : string) => {
//   const cookie = cookies().get("Authorization");
//   try {
//     const res = await userRequest.put("/api/post/", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Cookie: `Authorization=${cookie?.value}`,
//       },
//       params: {
//         postId: postId,
//         userId: userId,
//       },
//     });
//     return res.data;
//   } catch (error: any) {
//     console.log(error);
//     return error.response.data;
//   }
// };

import { userRequest } from "@/utils/requestMethod";

export const updatePost = async (formData: FormData, postId : string, userId : string) => {
  try {
    const res = await userRequest.put("/api/post/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params: {
        postId: postId,
        userId: userId,
      },
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};
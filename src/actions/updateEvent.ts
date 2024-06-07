// "use server";
// import { cookies } from "next/headers";
// import { userRequest } from "@/utils/requestMethod";

// export const updateEvent = async (
//   formData: FormData,
//   eventId: string,
// ) => {
//   const cookie = cookies().get("Authorization");
//   try {
//     const res = await userRequest.put("/api/event/", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Cookie: `Authorization=${cookie?.value}`,
//       },
//       params: {
//         eventId: eventId,
//       },
//     });
//     return res.data;
//   } catch (error: any) {
//     console.log(error);
//     return error.response.data;
//   }
// };


import { userRequest } from "@/utils/requestMethod";

export const updateEvent = async (
  formData: FormData,
  eventId: string,
) => {
  try {
    const res = await userRequest.put("/api/event/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params: {
        eventId: eventId,
      },
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};
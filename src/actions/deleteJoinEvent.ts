// "use server";

// import { userRequest } from "@/utils/requestMethod";
// import { cookies } from "next/headers";

// export const deleteJoinEvent = async (userId: string, eventId: string) => {
//   const cookie = cookies().get("Authorization");
//   try {
//     const res = await userRequest.delete("/api/event/join", {
//       headers: {
//         "Content-Type": "application/json",
//         Cookie: `Authorization=${cookie?.value}`,
//       },
//       params: {
//         userId: userId,
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

export const deleteJoinEvent = async (userId: string, eventId: string) => {
  try {
    const res = await userRequest.delete("/api/event/join", {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        userId: userId,
        eventId: eventId,
      },
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};

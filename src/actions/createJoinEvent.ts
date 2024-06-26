// "use server";
// import { cookies } from "next/headers";
// import { userRequest } from "@/utils/requestMethod";

// type dataSendProps = {
//     userId : string;
//     eventId : string;
// }

// export const createJoinEvent= async (dataSend: dataSendProps) => {
//   const cookie = cookies().get("Authorization");
//   try {
//     const res = await userRequest.post("/api/event/join", dataSend, {
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

import { userRequest } from "@/utils/requestMethod";

type dataSendProps = {
  userId: string;
  eventId: string;
};

export const createJoinEvent = async (dataSend: dataSendProps) => {
  try {
    const res = await userRequest.post("/api/event/join", dataSend, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};

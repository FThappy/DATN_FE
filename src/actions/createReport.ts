// "use server";
// import { cookies } from "next/headers";
// import { userRequest } from "@/utils/requestMethod";

// type Props = {
//     itemId : string;
//     userId : string;
//     type : string;
//     reason : string[];
//     detail : string | undefined ;
// }

// export const createReport = async (dataSend : Props) => {
//   const cookie = cookies().get("Authorization");
//   try {
//     const res = await userRequest.post("/api/report", dataSend, {
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

type Props = {
  itemId: string;
  userId: string;
  type: string;
  reason: string[];
  detail: string | undefined;
};

export const createReport = async (dataSend: Props) => {
  try {
    const res = await userRequest.post('/api/report', dataSend, {
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

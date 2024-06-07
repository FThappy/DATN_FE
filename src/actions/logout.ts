"use server"
import { userRequest } from "@/utils/requestMethod";
import { cookies } from "next/headers";

export const logout = async () => {
  const cookie = cookies();
  const auth = cookie.get("Authorization");

  console.log(cookie.getAll());
  console.log(cookie)

  try {
    const res = await userRequest.delete(`api/auth/logout`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: `Authorization=${auth?.value}`,
      },
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};

// export const logout = async () => {
//     const cookie = cookies().get("Authorization");

//     try {
//         const response = await fetch("https://datn-be-3cll.onrender.com/api/auth/logout", {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//             Cookie: `Authorization=${cookie?.value}`,
//           },
//           credentials: "include",
//         });

//         if (!response.ok) {
//             throw new Error(`Error: ${response.statusText}`);
//         }

//         const data = await response.json();
//         return data;
//     } catch (error: any) {
//         console.error(error);
//         return { error: error.message };
//     }
// };
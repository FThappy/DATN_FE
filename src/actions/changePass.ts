import { userRequest } from "@/utils/requestMethod";

export const changePass = async (oldPass: string, newPass : string ,tokenChange: string) => {

  try {
    const res = await userRequest.put(
      "/api/user/pass",
      {
        newPassword : newPass,
        oldPassword : oldPass,
        tokenChange: tokenChange,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};

import { userRequest } from "@/utils/requestMethod";


export const updateUserName = async (username : string , tokenChange : string) => {
  try {
    const res = await userRequest.put("/api/user/username", {
        username: username,
        tokenChange: tokenChange
    }, {
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

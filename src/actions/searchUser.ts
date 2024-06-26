import { userRequest } from "@/utils/requestMethod";


export const searchUser = async (page:number, qSearch : string) => {
  try {
    const res = await userRequest.get(`api/user/search`, {
      headers: {
        "Content-Type": "application/json",
      },
      params : {
        page : page,
        qSearch : qSearch
      }
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};

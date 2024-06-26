import { userRequest } from "@/utils/requestMethod";

export const searchRoom = async (
  qSearch: string | null,

) => {
  try {
    const res = await userRequest.get(`api/message/search`, {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        qSearch: qSearch,
      },
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};

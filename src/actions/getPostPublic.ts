import { userRequest } from "@/utils/requestMethod";

export const getPostPublic = async (page: number) => {
  try {
    const res = await userRequest.get("/api/post/public", {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        page: page,
      },
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};

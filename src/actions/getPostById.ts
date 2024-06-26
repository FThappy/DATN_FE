import { userRequest } from "@/utils/requestMethod";

export const getPostById = async (postId: string) => {
  try {
    const res = await userRequest.get(`/api/post/postId`, {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        postId: postId,
      },
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};

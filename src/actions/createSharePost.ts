import { userRequest } from "@/utils/requestMethod";
import { SharePostProps } from "@/utils/typePost";

export const createSharePost = async (dataSend: SharePostProps) => {
  try {
    const res = await userRequest.post("/api/post/share", dataSend, {
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

import { userRequest } from "@/utils/requestMethod";

export const getMessageForRoom = async (roomId: string | undefined, skipItem :number) => {
  try {
    const res = await userRequest.get("/api/message/room", {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        roomId: roomId,
        skipItem: skipItem
      },
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};

import { userRequest } from "@/utils/requestMethod";


type DataSend = {
  displayName: string | undefined;
  birth: Date | undefined;
  phone: string | undefined;
  address: string | undefined;
  type: string | undefined;
}; 

export const updateUserInfo = async (dataSend: DataSend) => {
  try {
    const res = await userRequest.put("/api/user", dataSend, {
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

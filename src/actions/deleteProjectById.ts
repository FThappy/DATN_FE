import { userRequest } from '@/utils/requestMethod';

export const deleteProjectById = async (userId: string, projectId: string) => {
  try {
    const res = await userRequest.delete('/api/project', {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        userId: userId,
        projectId: projectId
      }
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};

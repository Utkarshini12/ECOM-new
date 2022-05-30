import { AxiosInstance } from '../../util/AxiosInstance';

export const getAllCategories = async () => {

  const URI = '/categories';

  try {

    const response = await AxiosInstance.get(URI);
    return response;

  } catch (error) {

    console.log(error);
    throw error;

  }


}
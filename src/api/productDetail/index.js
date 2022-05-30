import { AxiosInstance } from '../../util/AxiosInstance';


export const getProduct = async (id) => {

  const URI = `/products/${id}`;

  try {

    const product = await AxiosInstance.get(URI);
    console.log(product);
    return product;

  } catch (error) {

    throw error;

  }
}
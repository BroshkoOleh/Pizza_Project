import { Product } from "../lib/prisma/generatedPrisma/client";
import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";

export const search = async (query: string): Promise<Product[]> => {
  const { data } = await axiosInstance.get<{ products: Product[] }>(ApiRoutes.SEARCH_PRODUCTS, {
    params: { query },
  });

  return data.products;
};
// FOR EXAMPLE
// export const search = async (query: string): Promise<Product[]> => {
//   const { data } = await axios.get<{ products: Product[] }>(`api/products/search`, {
//     params: { query },
//   });

//   return data.products;
// };

import { z } from 'zod/v4';
import { ProductSchemaArray } from '../schemas';

export const getAllProducts = async () => {
  const response = await fetch('https://dummyjson.com/products');

  if (!response.ok) {
    throw new Error('Something went wrong!');
  }

  const resData = await response.json();

  //Validating with Zod
  const { success, data, error } = ProductSchemaArray.safeParse(
    resData.products
  );

  if (!success) {
    throw new Error(z.prettifyError(error));
  }

  return data;
};

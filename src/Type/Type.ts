export type error = { message: string; error?: any[] };
export type catalog = {
  id: string;
  price: number;
  name: string;
  discountedPrice?: number;
};

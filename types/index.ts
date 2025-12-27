export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  ingredients: Ingredients[];
  variation: Variation[];
}

export interface Ingredients {
  id: string;
  name: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  price: number;
}
export interface Variation {
  id: string;
  size: number | null;
  price: number;
  pizzaType: number | null;
  productId: string;
}
export interface Category {
  id: string;
  name: string;
  products: Product[];
}

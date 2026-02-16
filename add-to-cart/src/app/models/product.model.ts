export interface ProductModel {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

export interface CartItem extends ProductModel {
  quantity: number;
}   
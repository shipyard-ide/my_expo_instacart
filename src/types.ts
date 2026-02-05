export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Store {
  id: string;
  name: string;
  image: string;
  deliveryTime: string;
  deliveryFee: string;
  rating: number;
  categories: string[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  unit: string;
  storeId: string;
  category: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

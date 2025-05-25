import { Product } from '@entities/Product';

export interface CartItem extends Product {
  quantity: number;
  selectedOptions?: Record<string, string>;
}

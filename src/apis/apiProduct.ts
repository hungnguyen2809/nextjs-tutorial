import { CreateProductBodyType, ProductListResType, ProductResType } from '@/schemas/product.schema';
import { http } from './http';

export const apiProduct = {
  get: () => {
    return http.get<ProductListResType>('/products');
  },
  create: (body: CreateProductBodyType) => {
    return http.post<ProductResType>('/products', body);
  },
  uploadImage: (body: FormData) => {
    return http.post<{ data: string }>('/media/upload', body);
  },
};

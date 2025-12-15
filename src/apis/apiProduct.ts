import {
  CreateProductBodyType,
  ProductListResType,
  ProductResType,
  UpdateProductBodyType,
} from '@/schemas/product.schema';
import { http } from './http';

export const apiProduct = {
  getList: () => {
    return http.get<ProductListResType>('/products');
  },
  getDetail: (id: string) => {
    return http.get<ProductResType>(`/products/${id}`, {
      headers: {
        cache: 'no-store', //không cache
      },
    });
  },
  create: (body: CreateProductBodyType) => {
    return http.post<ProductResType>('/products', body);
  },
  update: (id: number, body: UpdateProductBodyType) => {
    return http.put<ProductResType>(`/products/${id}`, body);
  },
  delete: (id: number) => {
    return http.delete<ProductResType>(`/products/${id}`);
  },
  uploadImage: (body: FormData) => {
    return http.post<{ data: string }>('/media/upload', body);
  },
};

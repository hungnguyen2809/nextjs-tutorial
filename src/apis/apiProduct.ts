import { CreateProductBodyType, ProductListResType, ProductResType } from '@/schemas/product.schema';
import { http } from './http';

export const apiProduct = {
  getList: () => {
    return http.get<ProductListResType>('/products');
  },
  getDetail: (id: string) => {
    return http.get<ProductResType>(`/products/${id}`);
  },
  create: (body: CreateProductBodyType) => {
    return http.post<ProductResType>('/products', body);
  },
  uploadImage: (body: FormData) => {
    return http.post<{ data: string }>('/media/upload', body);
  },
};

'use client';

import { isClient } from '@/apis/http';
import { AppStorage } from '@/lib/storage';
import { ProductListResType } from '@/schemas/product.schema';
import Link from 'next/link';
import ButtonDeleteProduct from './button-delete';

const ButtonListAction = ({ product }: { product: ProductListResType['data'][0] }) => {
  const isAuthenticaed = isClient() && !!AppStorage.getSessionToken();

  return isAuthenticaed ? (
    <>
      <Link className="text-blue-500" href={`/products/${product.id}/edit`}>
        Edit
      </Link>
      <ButtonDeleteProduct productId={product.id} />
    </>
  ) : null;
};

export default ButtonListAction;

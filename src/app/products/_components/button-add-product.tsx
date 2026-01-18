'use client';

import { isClient } from '@/apis/http';
import { Button } from '@/components/ui/button';
import { AppStorage } from '@/lib/storage';
import Link from 'next/link';

const ButtonAddProduct = () => {
  const isAuthenticaed = isClient() && !!AppStorage.getSessionToken();

  return isAuthenticaed ? (
    <ul className="flex gap-2">
      <li>
        <Link className="underline" href={'/products/add'}>
          <Button>Thêm mới</Button>
        </Link>
      </li>
    </ul>
  ) : null;
};

export default ButtonAddProduct;

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const ProductListPage = () => {
  return (
    <div>
      <h1>ProductListPage</h1>

      <ul className="flex gap-2">
        <li>
          <Link className="underline" href={'/products/add'}>
            <Button>Thêm mới</Button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ProductListPage;

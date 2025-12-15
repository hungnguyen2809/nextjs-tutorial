import { apiProduct } from '@/apis/apiProduct';
import { Button } from '@/components/ui/button';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import ButtonDeleteProduct from './_components/button-delete';

async function ProductListPage() {
  const sessionToken = (await cookies()).get('sessionToken')?.value;
  const resList = await apiProduct.getList();
  const productList = resList.data.data;

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

      <div>List of product</div>
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            {sessionToken ? <th>Action</th> : null}
          </tr>
        </thead>
        <tbody>
          {productList?.map((item, idx) => (
            <tr key={item.id}>
              <td>{idx + 1}</td>
              <td>
                <Image src={item.image} alt={item.name} width={100} height={100} className="object-cover w-32 h-32" />
              </td>
              <td>
                <h3>{item.name}</h3>
              </td>
              <td>
                <p>{item.price}</p>
              </td>
              <td>
                <p>{item.description}</p>
              </td>
              {sessionToken ? (
                <td>
                  <div className="flex gap-2">
                    <Link className="text-blue-500" href={`/products/${item.id}`}>
                      Edit
                    </Link>
                    <ButtonDeleteProduct productId={item.id} />
                  </div>
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductListPage;

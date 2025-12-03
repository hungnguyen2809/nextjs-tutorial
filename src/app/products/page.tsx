import { apiProduct } from '@/apis/apiProduct';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

async function ProductListPage() {
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

      <div>List</div>
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
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
                <div>
                  <Link className="text-blue-500" href={`/products/${item.id}`}>
                    Edit
                  </Link>
                  <Link className="text-red-500" href={'#'}>
                    Delete
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductListPage;

import { apiProduct } from '@/apis/apiProduct';
import { ProductResType } from '@/schemas/product.schema';
import ProductForm from '../_components/product-form';

async function EditProductPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  let productInfo: ProductResType | null = null;

  try {
    const resProduct = await apiProduct.getDetail(id);
    productInfo = resProduct.data;
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      <h1>EditProductPage</h1>
      {productInfo ? <div>{productInfo.data.name}</div> : <p>Product not found with id = {id}</p>}

      <ProductForm productInfo={productInfo} />
    </div>
  );
}

export default EditProductPage;

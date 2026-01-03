import { apiProduct } from '@/apis/apiProduct';
import { ProductResType } from '@/schemas/product.schema';
import { Metadata, ResolvingMetadata } from 'next';
import { cache } from 'react';
import ProductForm from '../../_components/product-form';

const getDetail = cache(apiProduct.getDetail);

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // read route params
  const { id } = await params;
  let productInfo: ProductResType | null = null;

  // fetch data
  try {
    const resProduct = await getDetail(id);
    productInfo = resProduct.data;
  } catch (error) {
    console.log(error);
  }

  return {
    title: 'Cập nhật: ' + productInfo?.data.name,
    description: productInfo?.data.description,
  };
}

async function EditProductPage(props: Props) {
  const { id } = await props.params;
  let productInfo: ProductResType | null = null;

  try {
    const resProduct = await getDetail(id);
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

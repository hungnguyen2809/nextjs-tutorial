import { apiProduct } from '@/apis/apiProduct';
import { baseOpenGraph } from '@/app/shared-metadata';
import { ENV } from '@/configs/env';
import { ProductResType } from '@/schemas/product.schema';
import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import { cache } from 'react';

//dùng cái này để cahce lại không call api liên tục tới serrve vì,api detail này đang để là no-cahce
// => vào detail nó call api 2 lần: 1 lần get metadata, 1 lần lấy chi tiết product
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

  const urlPage = ENV.NEXT_PUBLIC_URL + '/products/' + productInfo?.data.id;

  return {
    title: productInfo?.data.name,
    description: productInfo?.data.description,
    openGraph: {
      ...baseOpenGraph,
      title: productInfo?.data.name,
      description: productInfo?.data.description,
      url: urlPage,
      images: [
        {
          url: productInfo?.data.image ?? '',
        },
      ],
    },
    alternates: {
      canonical: urlPage,
    },
  };
}

async function DetailProductPage(props: Props) {
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
      <h1>DetailProductPage</h1>
      {productInfo ? (
        <div>
          <p>Name: {productInfo.data.name}</p>
          <p>Price: {productInfo.data.price}</p>
          <p>Description: {productInfo.data.description}</p>
          <p>Image:</p>
          <Image
            src={productInfo.data.image}
            alt={productInfo.data.name}
            width={100}
            height={100}
            className="object-cover w-32 h-32"
          />
        </div>
      ) : (
        <p>Product not found with id = {id}</p>
      )}
    </div>
  );
}

export default DetailProductPage;

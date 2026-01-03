import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trang chủ',
};

const HomePage = () => {
  return (
    <main className="h-dvh">
      <h1 className="text-4xl">Xin chào các bạn nhỏ</h1>
    </main>
  );
};

export default HomePage;

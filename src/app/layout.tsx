import type { Metadata } from 'next';
import './globals.css';

import Header from '@/components/commom/header';
import SlideSession from '@/components/commom/slide-session';
import { Toaster } from '@/components/ui/sonner';
import { AppProvider } from '@/contexts/app-ctx';
import { SVNGilroy } from '@/theme/fonts';
import { ThemeProvider } from '@/theme/provider';
// import dynamic from 'next/dynamic';
import { baseOpenGraph } from './shared-metadata';

// const HeaderNoSSR = dynamic(() => import('@/components/commom/header'), { ssr: false });

export const metadata: Metadata = {
  title: {
    default: 'Hùng Shop',
    absolute: 'Hùng Shop',
    template: '%s | Hùng Shop',
  },
  description: 'Chuyên các loại sản phẩm mới nhất trên thị trường, giá cả phải chăng',
  openGraph: baseOpenGraph,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${SVNGilroy.className} ${SVNGilroy.variable} antialiased w-screen h-screen`}>
        <ThemeProvider enableSystem attribute="class" defaultTheme="system" disableTransitionOnChange>
          <AppProvider>
            <Header />
            {children}
            <SlideSession />
          </AppProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

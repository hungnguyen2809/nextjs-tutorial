import z from 'zod';

const envSchame = z.object({
  NEXT_PUBLIC_API_ENDPOINT: z.string(),
});

const envServer = envSchame.safeParse({
  NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

if (!envServer.success) {
  console.error(envServer.error.issues);
  throw new Error('Các giá trị khai báo trong file .env không hợp lệ');
}

export const ENV = envServer.data;

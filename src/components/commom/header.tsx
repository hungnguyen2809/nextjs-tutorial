'use client';

import { useAppContext } from '@/contexts/app-ctx';
import Link from 'next/link';
import ButtonLogout from './button-logout';
import { ModeToggle } from './mode-theme';

function Header() {
  const { accountInfo } = useAppContext();

  // const tokenSesssion = (await cookies()).get('sessionToken')?.value;
  // let accountInfo: AccountResType['data'] | null = null;

  // try {
  //   if (tokenSesssion) {
  //     const response = await accountApi.me(tokenSesssion);
  //     accountInfo = response.data.data;
  //   }
  // } catch (error) {
  //   console.log(error);
  // }

  return (
    <section>
      <ul className="flex gap-2">
        <li>
          <Link href={'/me'}>Xin chào: {accountInfo?.name}</Link>
        </li>
        <li>
          <Link className="underline" href={'/products'}>
            Sản phẩm
          </Link>
        </li>
        {accountInfo ? (
          <li>
            <ButtonLogout />
          </li>
        ) : (
          <>
            <li>
              <Link className="underline" href={'/login'}>
                Đăng nhập
              </Link>
            </li>
            <li>
              <Link className="underline" href={'/register'}>
                Đăng ký
              </Link>
            </li>
          </>
        )}
      </ul>

      <ModeToggle />
    </section>
  );
}

export default Header;

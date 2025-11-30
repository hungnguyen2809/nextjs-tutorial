import Link from 'next/link';
import ButtonLogout from './button-logout';
import { ModeToggle } from './mode-theme';

function Header() {
  return (
    <section className="flex justify-between items-center">
      <ul className="flex gap-2">
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

        <li>
          <ButtonLogout />
        </li>
      </ul>

      <ModeToggle />
    </section>
  );
}

export default Header;

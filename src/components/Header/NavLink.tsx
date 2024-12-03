import Link from 'next/link';
import { FC, ReactNode } from 'react';

interface NavLinkProps {
  href: string;
  children: ReactNode;
}

const NavLink: FC<NavLinkProps> = ({ href, children }) => (
  <Link href={href} className="font-medium text-gray-200 hover:text-blue-400">
    {children}
  </Link>
);

export default NavLink;
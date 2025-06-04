import React from 'react';
import Link from 'next/link';
import AuthButton from './AuthButton';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white p-4 fixed top-0 right-0 w-full">
      <ul className="flex space-x-4 justify-end">
        <li>
          <Link href="/">
            <AuthButton />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar; 
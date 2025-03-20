"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, Heart, User } from "lucide-react";

const Navbar = () => {
  const navIcons = [
    { Icon: Search, alt: "search", href: "/search" },
    { Icon: Heart, alt: "heart", href: "/favorites" },
    { Icon: User, alt: "user", href: "/profile" },
  ];

  return (
    <header className="w-full">
      <nav className="nav">
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/assets/icons/logo.svg"
            width={27}
            height={27}
            alt="logo"
          />
          <p className="nav-logo">
            Price<span className="text-primary">Fy</span>
          </p>
        </Link>

        <div className="flex justify-center gap-5">
          {navIcons.map(({ Icon, alt, href }) => (
            <Link href={href} key={alt}>
              <Icon className="h-6 w-6 text-gray-200 hover:text-primary transition-colors" />
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
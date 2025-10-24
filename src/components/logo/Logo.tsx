import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const Logo = (props: Props) => {
  return (
    <div className="hidden md:block w-full">
      <div className="w-24 h-8">
        <Link href="/" className="hover:cursor-pointer">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={2560}
            height={799}
            priority
            layout="intrinsic"
          />
        </Link>
      </div>
    </div>
  );
};

export default Logo;

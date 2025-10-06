import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const Logo = (props: Props) => {
  return (
    <div>
      <Link href="/">
        <Image
          alt="logo"
          src="/images/logo.png"
          width={100}
          height={50}
          priority
          layout="intrinsic"
        />
      </Link>
    </div>
  );
};

export default Logo;

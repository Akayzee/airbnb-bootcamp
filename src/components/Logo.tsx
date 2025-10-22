import Image from "next/image";
import React from "react";

type Props = {};

const Logo = (props: Props) => {
  return (
    <div className="hidden md:block w-full">
      <Image
        src="/images/logo.png"
        alt="Logo"
        width={100}
        height={50}
        priority
        layout="intrinsic"
      />
    </div>
  );
};

export default Logo;

import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const BlackLogo = (props: Props) => {
  return (
    <div className="hidden md:block w-full">
      <Link href="/hosting/listings">
        <Image
          src="/images/logoBlack.png"
          alt="Logo"
          width={50}
          height={50}
          priority
          layout="intrinsic"
        />
      </Link>
    </div>
  );
};

export default BlackLogo;

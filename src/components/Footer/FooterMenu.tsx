import { FooterMenuDetails } from "@/lib/constants";
import Link from "next/link";
import React from "react";

type Props = {};

const FooterMenu = (props: Props) => {
  return (
    <div className="flex flex-col md:flex-row  w-full gap-4 mt-10">
      {FooterMenuDetails.map((menu) => (
        <div key={menu.menuName} className="flex w-1/3 flex-col">
          <p className="font-semibold text-gray-900 my-5">{menu.menuName}</p>
          {menu.links.map((link) => (
            <Link
              key={link.label}
              href={link.path}
              className="text-sm text-gray-600 mb-3 hover:underline cursor-pointer"
            >
              {link.label}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FooterMenu;

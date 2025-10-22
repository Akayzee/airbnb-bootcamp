"use client";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { HostingNavLinks } from "@/lib/constants";

type Props = {};

const HostingHeaderLinks = (props: Props) => {
  const pathname = usePathname();

  return (
    <div className="w-full">
      <div className="flex gap-10">
        {HostingNavLinks.map((navLink) => (
          <div
            className={` ${
              pathname === navLink.path
                ? "border-b-3 border-gray-900 text-gray-900 "
                : "text-gray-600"
            }`}
            key={navLink.path}
          >
            <Link href={navLink.path} className="flex items-center">
              <p className="text-md hover:text-gray-900">{navLink.label}</p>
            </Link>
          </div>
        ))}
        {/* <div
          className={` ${
            pathname === "/"
              ? "border-b-3 border-gray-900 text-gray-900 "
              : "text-gray-600"
          }`}
        >
          <Link href="/" className="flex items-center">
            <p className="text-md hover:text-gray-900">Today</p>
          </Link>
        </div>
        <div
          className={` ${
            pathname === "/experiences"
              ? "border-b-3 border-gray-900 text-gray-900 "
              : "text-gray-600"
          }`}
        >
          <Link href="/experiences" className="flex items-center">
            <p className="text-md hover:text-gray-900">Calendar</p>
          </Link>
        </div>
        <div
          className={`${
            pathname === "/services"
              ? "border-b-3 border-gray-900 text-gray-900 "
              : "text-gray-600"
          }`}
        >
          <Link href="/services" className="flex items-center">
            <p className="text-md hover:text-gray-900">Listings</p>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default HostingHeaderLinks;

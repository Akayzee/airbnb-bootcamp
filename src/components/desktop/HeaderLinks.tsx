"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeaderMenu } from "@/lib/constants";

type Props = {};

const HeaderLinks = (props: Props) => {
  const pathname = usePathname();

  return (
    <div>
      <div className="flex gap-3">
        {HeaderMenu.map((menu) => (
          <div
            key={menu.label}
            className={
              pathname === menu.path
                ? "border-b-3 border-gray-900 text-gray-900"
                : "text-gray-600"
            }
          >
            <Link href={menu.path} className="flex items-center">
              <Image
                src={menu.imageUrl}
                alt={menu.label}
                width={70}
                height={70}
                className={
                  pathname !== menu.path
                    ? "hover:scale-120 transition-all duration-150 cursor-pointer"
                    : ""
                }
              />
              <p className="text-md hover:text-gray-900">{menu.label}</p>
            </Link>
          </div>
        ))}
        {/* Long version below
        
        <div
          className={
            pathname === "/"
              ? "border-b-3 border-gray-900 text-gray-900"
              : "text-gray-600"
          }
        >
          <Link href="/" className="flex items-center">
            <Image
              src="/images/home.avif"
              alt="homes"
              width={70}
              height={70}
              className={
                pathname !== "/"
                  ? "hover:scale-120 transition-all duration-150 cursor-pointer"
                  : ""
              }
            />
            <p className="text-md hover:text-gray-900">Homes</p>
          </Link>
        </div>

        <div
          className={
            pathname === "/experiences"
              ? "border-b-3 border-gray-900 text-gray-900"
              : "text-gray-600"
          }
        >
          <Link href="/experiences" className="flex items-center">
            <Image
              src="/images/parachute.avif"
              alt="homes"
              width={70}
              height={70}
              className={
                pathname !== "/experiences"
                  ? "hover:scale-120 transition-all duration-150 cursor-pointer"
                  : ""
              }
            />
            <p className="text-md hover:text-gray-900">Experiences</p>
          </Link>
        </div>

        <div
          className={
            pathname === "/services"
              ? "border-b-3 border-gray-900 text-gray-900"
              : "text-gray-600"
          }
        >
          <Link href="/services" className="flex items-center">
            <Image
              src="/images/bell.avif"
              alt="services"
              width={70}
              height={70}
              className={
                pathname !== "/services"
                  ? "hover:scale-120 transition-all duration-150 cursor-pointer"
                  : ""
              }
            />
            <p className="text-md hover:text-gray-900">Services</p>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default HeaderLinks;

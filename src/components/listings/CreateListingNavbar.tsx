"use client";
import React from "react";
import Container from "../Container";
import BlackLogo from "../logo/BlackLogo";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";

const CreateListingNavbar = () => {
  const pathname = usePathname();

  return (
    <div className="w-full">
      <Container>
        <div className="flex justify-between items-center ">
          <BlackLogo />

          {pathname === "/become-a-host" ? (
            <Link href="/hosting/listings">
              <Button
                size="lg"
                className="border-1 rounded-full border-gray-300 text-gray-800 p-3 hover:border-black bg-transparent hover:bg-transparent hover:cursor-pointer"
              >
                Exit
              </Button>
            </Link>
          ) : (
            <div className="flex justify-between w-full  flex-row-reverse md:flex-row md:justify-end gap-3 ">
              <Button
                size="lg"
                className="border-1 rounded-full border-gray-300 text-gray-800 p-3 hover:border-black bg-transparent hover:bg-transparent hover:cursor-pointer"
              >
                Questions?
              </Button>

              <Link href="/hosting/listings">
                <Button
                  size="lg"
                  className="border-1 rounded-full border-gray-300 text-gray-800 p-3 hover:border-black bg-transparent hover:bg-transparent hover:cursor-pointer"
                >
                  Save & Exit
                </Button>
              </Link>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default CreateListingNavbar;

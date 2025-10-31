"use client";
import React from "react";
import Container from "../Container";
import BlackLogo from "../logo/BlackLogo";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import SaveAndExitButton from "./SaveAndExitButton";

const CreateListingNavbar = () => {
  const pathname = usePathname();

  return (
    <Container>
      <div
        className="fixed top-0 left-0 right-0 z-50 p-4 shadow-md w-full bg-gray-50
    "
      >
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

              <SaveAndExitButton />
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default CreateListingNavbar;

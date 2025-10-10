import React from "react";

import Logo from "../Logo";
import Menu from "./Menu";

import Container from "../Container";
import HeaderLinks from "./HeaderLinks";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <div className="bg-gray-50 fixed top-0 left-0 right-0 z-50 w-full shadow-xs ">
      <Container>
        <div className="flex   justify-between items-center ">
          <Logo />

          <HeaderLinks />

          <Menu />
        </div>

        <SearchBar />
      </Container>
    </div>
  );
};

export default Navbar;

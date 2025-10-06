import React from "react";

import Logo from "../Logo";
import Menu from "./Menu";

import Container from "../Container";
import HeaderLinks from "./HeaderLinks";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <div className="bg-gray-50">
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

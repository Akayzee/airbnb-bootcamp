import React from "react";
import Logo from "../Logo";
import HeaderLinks from "./HeaderLinks";
import Menu from "./Menu";
import SearchBar from "./SearchBar";
import Container from "../Container";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="bg-gray-50">
      <Container>
        <div className="flex justify-between items-center">
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

import React from "react";

import Logo from "../../Logo";
import Menu from "../Menu";

import Container from "../../Container";
import HostingHeaderLinks from "./HostingHeaderLinks";

const HostingNavbar = () => {
  return (
    <div className="bg-gray-50 fixed top-0 left-0 right-0 z-50 w-full shadow-xs ">
      <Container>
        <div className="flex justify-between items-center ">
          <Logo />
          <HostingHeaderLinks />
          <Menu />
        </div>
      </Container>
    </div>
  );
};

export default HostingNavbar;

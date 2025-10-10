import React from "react";
import Container from "../Container";
import Link from "next/link";
import FutureGetAways from "./FutureGetAways";
import FooterMenu from "./FooterMenu";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className=" bg-gray-50">
      <Container>
        <FutureGetAways />
        <FooterMenu />
      </Container>
    </div>
  );
};

export default Footer;

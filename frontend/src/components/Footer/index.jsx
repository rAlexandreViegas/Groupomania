import Logo from "../../assets/icon-left-font-monochrome-black.png";

import { FooterStyle } from "./style";

function Footer() {
  return (
    <FooterStyle>
      <img src={Logo} alt="logo" />
    </FooterStyle>
  );
}

export default Footer;

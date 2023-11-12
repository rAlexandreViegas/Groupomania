import Logo from "../../assets/icon-left-font-monochrome-black.png";

import { Container } from "./style";

function Unauthorized() {
  return (
    <Container>
      {/* Logo of the web site */}
      <img src={Logo} alt="Logo" />

      <span>Vous n'avez pas l'autorisation d'acceder à cette page !</span>
    </Container>
  );
}

export default Unauthorized;

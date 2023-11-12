import Logo from "../../assets/icon-left-font.png";

import { Container } from "./style";

function Error() {
  return (
    <Container>
      {/* Logo of the site */}
      <img src={Logo} alt="Logo" />

      <span>Il semblerait que la page que vous cherchez n’existe pas</span>
    </Container>
  );
}

export default Error;

import LoginForm from "../../components/LoginForm";
import Logo from "../../assets/icon-left-font.png";

import { Img } from "./style";

function Login() {
  return (
    <>
      <Img src={Logo} alt="logo" />

      <LoginForm />
    </>
  );
}

export default Login;

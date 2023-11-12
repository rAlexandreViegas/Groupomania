import { useState } from "react";
import { Link } from "react-router-dom";

import SignUpForm from "../../components/SignUpForm";
import Logo from "../../assets/icon-left-font.png";

import { Img, Message } from "./style";

function SignUp() {
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [userExist, setUserExist] = useState(false);

  return (
    <div>
      <Link to="/">
        <Img src={Logo} alt="logo" />
      </Link>

      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <Message success>Inscription réussie !</Message>
      ) : null}

      {Object.keys(formErrors).length === 0 && userExist ? (
        <Message error>Cet utilisateur existe déjà !</Message>
      ) : null}

      <SignUpForm
        formErrors={formErrors}
        setFormErrors={setFormErrors}
        isSubmit={isSubmit}
        setIsSubmit={setIsSubmit}
        setUserExist={setUserExist}
      />
    </div>
  );
}

export default SignUp;

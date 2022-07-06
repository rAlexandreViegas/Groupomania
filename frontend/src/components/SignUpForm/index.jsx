import { useState } from "react";
import { Link } from "react-router-dom";

import Form from "../../utils/styles/form";
import Button from "../../utils/styles/button";

import { sendSignUpData } from "./function";

function SignUpForm({
  formErrors,
  setFormErrors,
  isSubmit,
  setIsSubmit,
  setUserExist,
}) {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    sendSignUpData(
      userFirstName,
      userLastName,
      userEmail,
      userPassword,
      setIsSubmit,
      setUserExist,
      setFormErrors
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="lastName">Nom</label>
        <input
          type="text"
          maxLength={40}
          id="lastName"
          onChange={(e) => setUserLastName(e.target.value)}
          required
        />
        <p>{formErrors.lastName}</p>
      </div>

      <div>
        <label htmlFor="firstName">Prénom</label>
        <input
          type="text"
          maxLength={40}
          id="firstName"
          onChange={(e) => setUserFirstName(e.target.value)}
          required
        />
        <p>{formErrors.firstName}</p>
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          maxLength={255}
          id="email"
          onChange={(e) => setUserEmail(e.target.value)}
          required
        />
        <p>{formErrors.email}</p>
      </div>

      <div>
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          maxLength={255}
          id="password"
          onChange={(e) => setUserPassword(e.target.value)}
          required
        />
        <p>{formErrors.password}</p>
      </div>

      <div>
        <Button type="submit">Créer un compte</Button>
      </div>

      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div>
          <Link to="/">
            <Button type="button" greyButton>
              Retour à la page de connexion
            </Button>
          </Link>
        </div>
      ) : null}
    </Form>
  );
}

export default SignUpForm;

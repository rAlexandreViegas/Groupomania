import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Form from "../../utils/styles/form";
import Button from "../../utils/styles/button";

import { sendLoginData } from "./function";

function LoginForm() {
  let navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    sendLoginData(userEmail, userPassword, navigate, setFormErrors);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Email input */}
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          onChange={(e) => setUserEmail(e.target.value)}
          required
        />
        <p>{formErrors.email}</p>
      </div>

      {/* Password input */}
      <div>
        <label htmlFor="password">Mot de passe</label>
        <input
          id="password"
          type="password"
          onChange={(e) => setUserPassword(e.target.value)}
          required
        />
        <p>{formErrors.password}</p>
      </div>

      {/* Submit button */}
      <div>
        <Button type="submit">Se connecter</Button>
      </div>

      {/* Link to the sign up page */}
      <div>
        <Link to="/signup">
          <Button type="button" greyButton>
            Créer un compte
          </Button>
        </Link>
      </div>
    </Form>
  );
}

export default LoginForm;

import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Button from "../../utils/styles/button";

import { getUser, updateUser, deleteUser } from "./function";
import { Form } from "./style";

function EditProfileForm({ setDisplayPage }) {
  const { id } = useParams();
  const [avatarFile, setAvatarFile] = useState(null);
  const [imgSrc, setImgSrc] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const refFirstName = useRef();
  const refLastName = useRef();
  const refEmail = useRef();
  const refInput = useRef();

  useEffect(() => {
    getUser(id, refFirstName, refLastName, refEmail, setImgSrc, setDisplayPage);
  }, [id, setDisplayPage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(
      avatarFile,
      refFirstName,
      refLastName,
      id,
      setImgSrc,
      setFormErrors
    );
    setAvatarFile(null);
    refInput.current.value = null;
  };

  const handleDelete = () => {
    if (window.confirm("Voulez-vous vraiment supprimer votre compte ?")) {
      deleteUser(id);
    } else {
      return;
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <img src={`http://localhost:3000${imgSrc}`} alt="avatar" />

      <div>
        <label htmlFor="avatar">Modifier la photo de profil :</label>

        {/* Avtart input */}
        <input
          ref={refInput}
          id="avatar"
          type="file"
          onChange={(e) => setAvatarFile(e.target.files[0])}
        />

        <span>{formErrors.avatar}</span>
      </div>

      {/* Last name input */}
      <div>
        <label htmlFor="lastName">Nom : </label>

        <input
          ref={refLastName}
          id="lastName"
          type="text"
          maxLength={40}
          required
        />

        <span>{formErrors.lastName}</span>
      </div>

      {/* First name input */}
      <div>
        <label htmlFor="firstName">Prénom : </label>

        <input
          ref={refFirstName}
          id="firstName"
          type="text"
          maxLength={40}
          required
        />

        <span>{formErrors.firstName}</span>
      </div>

      {/* Email input */}
      <div>
        <label htmlFor="email">Email : </label>

        <input ref={refEmail} id="email" type="email" disabled />
      </div>

      {/* Submit button */}
      <Button type="submit">Enregistrer</Button>

      {/* Delete button */}
      <Button type="button" onClick={handleDelete} greyButton>
        Supprimer le compte
      </Button>
    </Form>
  );
}

export default EditProfileForm;

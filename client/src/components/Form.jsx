import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";

const API_URL = process.env.REACT_APP_API_URL;
const API_USER_URL = process.env.REACT_APP_API_USER_URL;

export default function Form({ setDisplayPage }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const refLastName = useRef(null);
  const refFirstName = useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const API_USER_ID_URL = `${API_USER_URL}${id}`;
  const API_USER_AVATAR_URL = `${API_URL}${imgSrc}`;

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(API_USER_ID_URL, {
          credentials: "include",
        });
        const data = await response.json();

        if (!data.error && response.status === 200) {
          refFirstName.current.value = data.user.firstName;
          refLastName.current.value = data.user.lastName;
          setImgSrc(data.user.avatarUrl);
        } else {
          setDisplayPage(false);
          console.error(data.error);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchUser();
  }, [success, API_USER_ID_URL, setDisplayPage]);

  async function updateUser() {
    setSuccess(false);

    const formData = new FormData();
    formData.append("firstName", refFirstName.current.value);
    formData.append("lastName", refLastName.current.value);
    if (avatarFile) {
      formData.append("avatarUrl", avatarFile);
    }

    try {
      const response = await fetch(`${API_USER_URL}${id}`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });
      const data = await response.json();

      if (response.status === 400) {
        const errors = data.errors.reduce((acc, error) => {
          acc[error.param] = error.msg;
          return acc;
        }, {});

        setErrors(errors);
      } else {
        if (avatarFile) {
          setImgSrc(avatarFile);
        }

        setAvatarFile(null);
        setFileName("");
        setErrors({});
        setSuccess(true);
      }
    } catch (error) {
      setErrors({
        avatar: "Image format must be jpg/jpeg or png and 2MB max!",
      });
      console.error(error);
    }
  }

  async function deleteUser() {
    try {
      await fetch(`${API_USER_URL}${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setFileName(file.name);
      e.target.value = "";
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateUser();
  }

  function handleDelete() {
    if (window.confirm("Voulez-vous vraiment supprimer votre compte ?")) {
      deleteUser(id);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input id="avatar" type="file" onChange={handleFileChange} hidden />
      <IconButton size="large">
        <label htmlFor="avatar">
          <Avatar
            src={API_USER_AVATAR_URL}
            alt="avatar"
            sx={{ width: 200, height: 200 }}
          />
          <EditIcon className="edit_icon" />
        </label>
      </IconButton>
      <Typography sx={{ height: "24px" }}>{fileName}</Typography>
      {success && <Alert severity="success">Modification saved!</Alert>}
      <Alert
        severity="error"
        sx={{
          visibility: errors.avatar ? "visible" : "hidden",
          display: success ? "none" : "flex",
        }}
      >
        {errors.avatar}
      </Alert>
      <TextField
        id="lastName"
        type="text"
        label="Nom :"
        helperText={errors.lastName ? errors.lastName : ""}
        error={Boolean(errors.lastName)}
        sx={{ width: "90%" }}
        inputRef={refLastName}
        focused
      />
      <TextField
        id="firstName"
        type="text"
        label="Prénom :"
        helperText={errors.firstName ? errors.firstName : ""}
        error={Boolean(errors.firstName)}
        sx={{ width: "90%" }}
        inputRef={refFirstName}
        focused
      />
      <div className="form_buttons">
        <Button
          type="submit"
          variant="contained"
          color="success"
          sx={{ width: "calc(45% - 0.25rem)" }}
          startIcon={<SaveIcon />}
        >
          Save
        </Button>
        <Button
          type="button"
          variant="contained"
          color="error"
          sx={{ width: "calc(45% - 0.25rem)" }}
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </form>
  );
}

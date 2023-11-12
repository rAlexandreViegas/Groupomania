/* eslint-disable no-unused-expressions */
/**
 * Get the user's data
 * @param {Number} id
 * @param {Function} refFirstName
 * @param {Function} refLastName
 * @param {Function} refEmail
 * @param {Function} setImgSrc
 * @param {Function} setDisplayPage
 */
async function getUser(
  id,
  refFirstName,
  refLastName,
  refEmail,
  setImgSrc,
  setDisplayPage
) {
  try {
    const resultApi = await fetch("http://localhost:3000/api/user/" + id, {
      method: "GET",
      credentials: "include",
    });
    const data = await resultApi.json();
    if (!data.error) {
      refFirstName.current.value = data.user.firstName;
      refLastName.current.value = data.user.lastName;
      refEmail.current.value = data.user.email;
      data.user.avatarUrl
        ? setImgSrc(data.user.avatarUrl)
        : setImgSrc("/images/default.png");
    } else {
      setDisplayPage(false);
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * Update the user's data
 * @param {File} avatarFile
 * @param {Function} refFirstName
 * @param {Function} refLastName
 * @param {Number} id
 * @param {Function} setImgSrc
 * @param {Function} setFormErrors
 */
async function updateUser(
  avatarFile,
  refFirstName,
  refLastName,
  id,
  setImgSrc,
  setFormErrors,
) {
  if (avatarFile !== null) {
    const formData = new FormData();
    formData.append("firstName", refFirstName.current.value);
    formData.append("lastName", refLastName.current.value);
    formData.append("avatarUrl", avatarFile);
    try {
      const resultApi = await fetch("http://localhost:3000/api/user/" + id, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });
      const data = await resultApi.json();
      if (resultApi.status === 400) {
        data.errors[0].param === "lastName"
          ? setFormErrors({
              lastName: data.errors[0].msg,
            })
          : null;
        data.errors[0].param === "firstName"
          ? setFormErrors({
              firstName: data.errors[0].msg,
            })
          : null;
      } else {
        setFormErrors({});
        setImgSrc(data.user.avatarUrl);
        alert("Profil mis à jour");
      }
    } catch (error) {
      setFormErrors({
        avatar:
          "L'avatar ne doit pas faire plus de 1Mo et doit être au format jpg, jpeg ou png !",
      });
      console.log(error);
    }
  } else {
    try {
      const resultApi = await fetch("http://localhost:3000/api/user/" + id, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: refFirstName.current.value,
          lastName: refLastName.current.value,
        }),
      });
      const data = await resultApi.json();
      if (resultApi.status === 400) {
        data.errors[0].param === "lastName"
          ? setFormErrors({
              lastName: data.errors[0].msg,
            })
          : null;
        data.errors[0].param === "firstName"
          ? setFormErrors({
              firstName: data.errors[0].msg,
            })
          : null;
      } else {
        setFormErrors({});
        alert("Profil mis à jour");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

/**
 * Delete a user
 * @param {Number} id
 */
async function deleteUser(id) {
  try {
    await fetch("http://localhost:3000/api/user/" + id, {
      method: "DELETE",
      credentials: "include",
    });
    window.location.href = "/";
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getUser,
  updateUser,
  deleteUser,
};

/* eslint-disable no-unused-expressions */
/**
 * Send a request to the server to create a new user
 * @param {String} userFirstName
 * @param {String} userLastName
 * @param {String} userEmail
 * @param {String} userPassword
 * @param {Function} setIsSubmit
 * @param {Function} setUserExist
 * @param {Function} setFormErrors
 */
async function sendSignUpData(
  userFirstName,
  userLastName,
  userEmail,
  userPassword,
  setIsSubmit,
  setUserExist,
  setFormErrors
) {
  try {
    const resultApi = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: userFirstName,
        lastName: userLastName,
        email: userEmail,
        password: userPassword,
      }),
    });
    const data = await resultApi.json();
    if (!data.errors) {
      setFormErrors({});
      data.error ? setUserExist(true) : setUserExist(false);
      data.error ? setIsSubmit(false) : setIsSubmit(true);
    } else {
      data.errors[0].param === "lastName"
        ? setFormErrors({ lastName: data.errors[0].msg })
        : null;
      data.errors[0].param === "firstName"
        ? setFormErrors({ firstName: data.errors[0].msg })
        : null;
      data.errors[0].param === "email"
        ? setFormErrors({ email: data.errors[0].msg })
        : null;
      data.errors[0].param === "password"
        ? setFormErrors({ password: data.errors[0].msg })
        : null;
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  sendSignUpData,
};

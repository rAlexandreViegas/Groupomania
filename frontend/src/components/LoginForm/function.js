/**
 * Login
 * @param {String} userEmail
 * @param {String} userPassword
 * @param {Function} navigate
 * @param {Function} setFormErrors
 */
async function sendLoginData(userEmail, userPassword, navigate, setFormErrors) {
  try {
    const resultApi = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
      }),
    });
    const data = await resultApi.json();
    if (!data.email && !data.password) {
      localStorage.setItem("userId", JSON.stringify(data.userId));
      navigate("/feed");
    } else {
      setFormErrors(data);
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  sendLoginData,
};

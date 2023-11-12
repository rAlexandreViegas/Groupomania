/**
 * Disconnect the user
 */
async function disconnect() {
  try {
    await fetch("http://localhost:3000/api/auth/logout", {
      method: "DELETE",
      credentials: "include",
    });
    localStorage.clear();
    window.location.href = "/";
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  disconnect,
};

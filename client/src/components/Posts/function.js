/**
 * Get all posts from the database
 * @param {Function} setDataPosts
 * @param {Function} setDisplayPage
 */
async function getAllPosts(setDataPosts, setDisplayPage) {
  try {
    const resultApi = await fetch("http://localhost:3000/api/post", {
      method: "GET",
      credentials: "include",
    });
    const data = await resultApi.json();
    if (!data.error) {
      setDataPosts(data.posts);
    } else {
      setDisplayPage(false);
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllPosts,
};

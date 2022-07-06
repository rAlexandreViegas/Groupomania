/**
 * Create a post
 * @param {File} postImg
 * @param {String} postMessage
 * @param {Number} userId
 * @param {Function} getAllPosts
 * @param {Function} setDataPosts
 * @param {Function} setDisplayPage
 */
async function createPost(
  postImg,
  postMessage,
  userId,
  getAllPosts,
  setDataPosts,
  setDisplayPage
) {
  if (postImg !== null) {
    const formData = new FormData();
    formData.append("message", postMessage);
    formData.append("imageUrl", postImg);
    formData.append("user_id", userId);
    try {
      await fetch("http://localhost:3000/api/post", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      getAllPosts(setDataPosts, setDisplayPage);
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      await fetch("http://localhost:3000/api/post", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: postMessage,
          user_id: userId,
        }),
      });
      getAllPosts(setDataPosts, setDisplayPage);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = {
  createPost,
};

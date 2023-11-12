/**
 * Update the post content
 * @param {String} postEditMessage
 * @param {File} postEditImg
 * @param {Number} postId
 * @param {Function} getAllPosts
 * @param {Function} setDataPosts
 * @param {Function} setDisplayPage
 */
async function updatePost(
  postEditMessage,
  postEditImg,
  postId,
  getAllPosts,
  setDataPosts,
  setDisplayPage
) {
  if (postEditImg !== null) {
    const formData = new FormData();
    formData.append("message", postEditMessage);
    formData.append("imageUrl", postEditImg);
    try {
      await fetch("http://localhost:3000/api/post/" + postId, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });
      getAllPosts(setDataPosts, setDisplayPage);
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      await fetch("http://localhost:3000/api/post/" + postId, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: postEditMessage }),
      });
      getAllPosts(setDataPosts, setDisplayPage);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = {
  updatePost,
};

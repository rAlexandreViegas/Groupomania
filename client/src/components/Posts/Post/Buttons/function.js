/**
 * Like a post
 * @param {Number} postId
 * @param {Number} userId
 * @param {Function} getAllPosts
 * @param {Function} setDataPosts
 * @param {Function} setDisplayPage
 */
async function likePost(
  postId,
  userId,
  getAllPosts,
  setDataPosts,
  setDisplayPage
) {
  try {
    await fetch("http://localhost:3000/api/post/" + postId + "/like", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        post_id: postId,
      }),
    });
    getAllPosts(setDataPosts, setDisplayPage);
  } catch (error) {
    console.log(error);
  }
}

/**
 * Delete a post
 * @param {Number} postId
 * @param {Function} getAllPosts
 * @param {Function} setDataPosts
 * @param {Function} setDisplayPage
 */
async function deletePost(postId, getAllPosts, setDataPosts, setDisplayPage) {
  try {
    await fetch("http://localhost:3000/api/post/" + postId, {
      method: "DELETE",
      credentials: "include",
    });
    getAllPosts(setDataPosts, setDisplayPage);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  likePost,
  deletePost,
};

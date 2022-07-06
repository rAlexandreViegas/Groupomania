import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { getAllPosts } from "../../function";
import { likePost, deletePost } from "./function";
import { Div } from "./style";

function Buttons({
  post,
  setDataPosts,
  setDisplayPage,
  editPost,
  setEditPost,
}) {
  const userId = JSON.parse(localStorage.getItem("userId"));

  const handleLike = (postId) => {
    likePost(postId, userId, getAllPosts, setDataPosts, setDisplayPage);
  };

  const handleDelete = (postId) => {
    deletePost(postId, getAllPosts, setDataPosts, setDisplayPage);
  };

  return (
    <Div container>
      <Div>
        <div>
          {/* Like button */}
          <button onClick={() => handleLike(post.id)}>
            <FontAwesomeIcon icon={faThumbsUp} />
          </button>

          {/* Number of likes */}
          <span>{post.likes.length}</span>
        </div>

        <div>
          {/* Edit button */}
          {editPost ? null : post.user_id === userId || userId === 1 ? (
            <button onClick={(e) => setEditPost(true)}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          ) : null}

          {/* Delete button */}
          {post.user_id === userId || userId === 1 ? (
            <button onClick={() => handleDelete(post.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          ) : null}
        </div>
      </Div>
    </Div>
  );
}

export default Buttons;

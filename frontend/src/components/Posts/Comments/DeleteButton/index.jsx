import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { getAllPosts } from "../../function";
import { deleteComment } from "./function";
import { Container } from "./style";

function DeleteButton({ setDataPosts, setDisplayPage, comment }) {
  const userId = JSON.parse(localStorage.getItem("userId"));

  const handleDelete = (commentId) => {
    deleteComment(commentId, getAllPosts, setDataPosts, setDisplayPage);
  };

  return (
    <Container>
      {/* Delete button */}
      {comment.user_id === userId || userId === 1 ? (
        <button onClick={() => handleDelete(comment.id)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      ) : null}
    </Container>
  );
}

export default DeleteButton;

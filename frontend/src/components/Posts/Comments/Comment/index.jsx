import { Container } from "./style";

function Comment({ comment }) {
  return (
    <Container key={comment.user_id}>
      {/* Avatar */}
      {comment.users.avatarUrl ? (
        <img
          src={`http://localhost:3000${comment.users.avatarUrl}`}
          alt="avatar"
        />
      ) : (
        <img src={`http://localhost:3000/images/default.png`} alt="avatar" />
      )}

      <div>
        <div>
          {/* Name */}
          <span>
            {comment.users.firstName} {comment.users.lastName}
          </span>

          {/* Message */}
          <p>{comment.message}</p>
        </div>

        {/* Date */}
        <span>
          {Intl.DateTimeFormat("fr-FR", {
            dateStyle: "long",
            timeStyle: "short",
          }).format(new Date(comment.createdAt))}
        </span>
      </div>
    </Container>
  );
}

export default Comment;

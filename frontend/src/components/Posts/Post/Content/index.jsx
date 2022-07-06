import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

import Button from "../../../../utils/styles/button";

import { getAllPosts } from "../../function";
import { updatePost } from "./function";
import { Form, Div } from "./style";

function Content({
  post,
  setDataPosts,
  setDisplayPage,
  editPost,
  setEditPost,
}) {
  const [postEditMessage, setPostEditMessage] = useState(post.message);
  const [postEditImg, setPostEditImg] = useState(null);
  const [fileName, setFileName] = useState("");
  const ref = useRef();

  const handleChange = (e) => {
    setPostEditImg(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const handleSubmit = (postId) => {
    updatePost(
      postEditMessage,
      postEditImg,
      postId,
      getAllPosts,
      setDataPosts,
      setDisplayPage
    );
    setEditPost(false);
    setFileName("");
    setPostEditImg(null);
    ref.current.value = null;
  };

  return (
    <>
      {editPost ? (
        <Form onSubmit={() => handleSubmit(post.id)}>
          {/* Message textarea */}
          <textarea
            value={postEditMessage}
            maxLength="255"
            type="text"
            onChange={(e) => setPostEditMessage(e.target.value)}
          />

          {/* Image */}
          {post.imageUrl ? (
            <img src={`http://localhost:3000${post.imageUrl}`} alt="post" />
          ) : null}

          <div>
            {/* File input */}
            <span>{fileName}</span>
            <label htmlFor="postEditImage">
              <FontAwesomeIcon icon={faImage} size="2x" />
            </label>
            <input
              ref={ref}
              id="postEditImage"
              type="file"
              onChange={handleChange}
            />

            {/* Submit button */}
            <Button type="submit" smallButton>
              MODIFIER
            </Button>

            {/* Cancel button */}
            <Button
              type="button"
              onClick={() => setEditPost(false)}
              smallButton
            >
              ANNULER
            </Button>
          </div>
        </Form>
      ) : (
        <>
          {/* Message */}
          <p>{post.message}</p>

          {/* Image */}
          {post.imageUrl ? (
            <Div>
              <img src={`http://localhost:3000${post.imageUrl}`} alt="post" />
            </Div>
          ) : null}
        </>
      )}
    </>
  );
}

export default Content;

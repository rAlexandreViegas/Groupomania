import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

import Button from "../../../utils/styles/button";

import { getAllPosts } from "../function";
import { createPost } from "./function";
import { Form } from "./style";

function CreatePost({ setDataPosts, setDisplayPage }) {
  const userId = JSON.parse(localStorage.getItem("userId"));
  const [postMessage, setPostMessage] = useState("");
  const [postImg, setPostImg] = useState(null);
  const [fileName, setFileName] = useState("");
  const ref = useRef();

  const handleChange = (e) => {
    setPostImg(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(
      postImg,
      postMessage,
      userId,
      getAllPosts,
      setDataPosts,
      setDisplayPage
    );
    setPostMessage("");
    setFileName("");
    setPostImg(null);
    ref.current.value = null;
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {/* Message textarea */}
        <textarea
          placeholder="Écrivez votre post ici..."
          value={postMessage}
          maxLength="255"
          onChange={(e) => setPostMessage(e.target.value)}
          required
        />

        <div>
          {/* File name */}
          <span>{fileName}</span>

          {/* File input */}
          <label htmlFor="postImage">
            <FontAwesomeIcon icon={faImage} size="2x" />
          </label>
          <input ref={ref} type="file" id="postImage" onChange={handleChange} />

          {/* Submit button */}
          <Button type="submit" smallButton>
            CRÉER UN POST
          </Button>
        </div>
      </Form>
    </>
  );
}

export default CreatePost;

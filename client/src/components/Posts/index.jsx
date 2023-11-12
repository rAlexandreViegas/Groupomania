import { useState, useEffect } from "react";

import CreatePost from "./CreatePost";
import Post from "./Post";
import Comments from "./Comments";

import { getAllPosts } from "./function";
import { Container } from "./style";

function Posts({ setDisplayPage }) {
  const [dataPosts, setDataPosts] = useState([]);

  useEffect(() => {
    getAllPosts(setDataPosts, setDisplayPage);
  }, [setDisplayPage]);

  return (
    <>
      {/* Create a Post */}
      <CreatePost
        setDataPosts={setDataPosts}
        setDisplayPage={setDisplayPage}
      />

      {/* Display posts */}
      {dataPosts.map((post) => {
        return (
          <Container key={post.id}>
            {/* Post */}
            <Post
              post={post}
              setDataPosts={setDataPosts}
              setDisplayPage={setDisplayPage}
            />

            {/* Comments */}
            <Comments
              post={post}
              setDataPosts={setDataPosts}
              setDisplayPage={setDisplayPage}
            />
          </Container>
        );
      })}
    </>
  );
}

export default Posts;

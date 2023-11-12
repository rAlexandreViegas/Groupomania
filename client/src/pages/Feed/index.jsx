import { useState } from "react";

import Header from "../../components/Header";
import Posts from "../../components/Posts";
import Footer from "../../components/Footer";
import Unauthorized from "../../components/Unauthorized";

import { Div, Container } from "./style";

function Feed() {
  const [displayPage, setDisplayPage] = useState(true);

  return (
    <>
      {displayPage ? (
        <Div>
          <Container>
            <Header />

            <Posts setDisplayPage={setDisplayPage} />
          </Container>

          <Footer />
        </Div>
      ) : (
        <Unauthorized />
      )}
    </>
  );
}

export default Feed;

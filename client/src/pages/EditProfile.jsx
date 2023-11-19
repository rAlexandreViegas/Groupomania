import { useState } from "react";
import Header from "../components/Header";
import Form from "../components/Form";
import Footer from "../components/Footer";
import Unauthorized from "../components/Unauthorized";

export default function EditProfile() {
  const [displayPage, setDisplayPage] = useState(true);

  return (
    <>
      {displayPage ? (
        <>
          <Header />
          <Form setDisplayPage={setDisplayPage} />
          <Footer />
        </>
      ) : (
        <Unauthorized />
      )}
    </>
  );
}

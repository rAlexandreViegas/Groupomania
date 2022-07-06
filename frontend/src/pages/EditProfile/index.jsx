import { useState } from "react";

import Header from "../../components/Header";
import EditProfileForm from "../../components/EditProfileForm";
import Footer from "../../components/Footer";
import Unauthorized from "../../components/Unauthorized";

import { Div, Container } from "./style";

function EditProfile() {
  const [displayPage, setDisplayPage] = useState(true);

  return (
    <>
      {displayPage ? (
        <Div>
          <Container>
            <Header />

            <EditProfileForm setDisplayPage={setDisplayPage} />
          </Container>

          <Footer />
        </Div>
      ) : (
        <Unauthorized />
      )}
    </>
  );
}

export default EditProfile;

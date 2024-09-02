import React from "react";
import DevelopmentsHeader from "./DevelopmentsHeader";
import DevelopmentsGallery from "./DevelopmentsGallery";
import DevelopmentsDescription from "./DevelopmentsDescription";
import DevelopmentsMap from "./DevelopmentsMap";
import DevelopmentsContactForm from "./DevelopmentsContactForm";
import { Container, PropContainer } from "components/layout";

const DevelopmentsDetail = ({ property, properties, propertySubs }) => {
  return (
    <PropContainer>
      <Container>
        <DevelopmentsHeader property={property} />
        <DevelopmentsGallery property={property} />
        <DevelopmentsDescription property={property} propertySubs={propertySubs} />
        <DevelopmentsMap property={property} />
        <DevelopmentsContactForm />
      </Container>
    </PropContainer>
  );
};

export default DevelopmentsDetail;

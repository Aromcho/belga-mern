import React from "react";
import { Layout } from "../layout";
import PropertyGallery from "./PropertyGallery";
import PropertyInfo from "./PropertyInfo";
import PropertyFeatures from "./PropertyFeatures";
import PropertyMap from "./PropertyMap";
import SimilarProperties from "./SimilarProperties";
import ContactSection from "./ContactSection";

const PropertyDetail = ({ property, properties }) => {
  return (
    <Layout>
      <PropertyInfo property={property} />
      <PropertyGallery property={property} />
      <PropertyFeatures property={property} />
      <PropertyMap property={property} />
      <SimilarProperties properties={properties} />
      <ContactSection/>
    </Layout>
  );
};

export default PropertyDetail;

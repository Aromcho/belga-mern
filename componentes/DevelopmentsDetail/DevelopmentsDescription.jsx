import React from "react";
import parse from "html-react-parser";
import { BodyProp, BodyFeatures, FeaturesGrid, Feature, FtHead, FtImg, FtBottom, MoreInfo, MoreItem, MoreItemTitle, MoreItemText, BodyDesc, DescTitle, DescText } from "./styles";

const DevelopmentsDescription = ({ property, propertySubs }) => {
  const devPropertiesData = getDevelopmentsData(propertySubs);

  return (
    <BodyProp>
      <BodyFeatures>
        <FeaturesGrid>
          {property?.age && (
            <Feature>
              <FtHead>{property.age === "-1" ? "En construcción" : property.age}</FtHead>
              <FtImg src="/images/icons/prop_antiguedad.svg" />
              <FtBottom>Antigüedad</FtBottom>
            </Feature>
          )}
          {devPropertiesData?.roofed_surface && (
            <Feature>
              <FtHead>{devPropertiesData.roofed_surface}</FtHead>
              <FtImg src="/images/icons/prop_m2.svg" />
              <FtBottom>Sup. Cub.</FtBottom>
            </Feature>
          )}
          {devPropertiesData?.total_surface && (
            <Feature>
              <FtHead>{devPropertiesData?.total_surface}</FtHead>
              <FtImg src="/images/icons/prop_m2.svg" />
              <FtBottom>Sup. Total</FtBottom>
            </Feature>
          )}
        </FeaturesGrid>
        <MoreInfo>
          <MoreItem>
            <MoreItemTitle>Información</MoreItemTitle>
            <MoreItemText>{property.description}</MoreItemText>
          </MoreItem>
          <MoreItem>
            <MoreItemTitle>Superficies</MoreItemTitle>
            <MoreItemText>{devPropertiesData.roofed_surface}</MoreItemText>
          </MoreItem>
        </MoreInfo>
      </BodyFeatures>
      <BodyDesc>
        <DescTitle>Descripción</DescTitle>
        <DescText>{parse(property.rich_description || property.description)}</DescText>
      </BodyDesc>
    </BodyProp>
  );
};

export default DevelopmentsDescription;

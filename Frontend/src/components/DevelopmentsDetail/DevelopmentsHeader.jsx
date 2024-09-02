import React from "react";
import { ArrowBackIcon, WhatsappIcon, MailIcon } from "../icons";
import { PATHS } from "../../config";
import { BackWrapper, HeadProp, HeadAddressPrice, HeadAddress, HeadPrice, HeadDivisor, HeadInfoShare, HeadInfo, HeadShare } from "./styles";

const DevelopmentsHeader = ({ property }) => {
  const devPropertiesData = getDevelopmentsData(property.property_subs);

  return (
    <HeadProp>
      <BackWrapper className="inversion">
        <a className="back--link" onClick={() => window.history.back()}>
          <ArrowBackIcon />
          Volver a la búsqueda
        </a>
      </BackWrapper>
      <HeadAddressPrice>
        <HeadAddress>{property.fake_address}</HeadAddress>
        {devPropertiesData.min_price && (
          <HeadPrice>{`Venta Desde ${devPropertiesData.currency} ${devPropertiesData.min_price}`}</HeadPrice>
        )}
      </HeadAddressPrice>
      <HeadDivisor />
      <HeadInfoShare>
        <HeadInfo>{property.location?.name}</HeadInfo>
        <HeadShare>
          Enviar por
          <a target="_blank" href={`https://api.whatsapp.com/send?text=Encontré esta excelente propiedad! ${PATHS.EMPRENDIMIENTOS}/${property.id}`}>
            <WhatsappIcon />
          </a>
          <a target="_blank" href={`mailto:?subject=${property.fake_address} - Belga&body=Encontré esta excelente propiedad que te puede interesar: ${PATHS.EMPRENDIMIENTOS}/${property.id}`}>
            <MailIcon />
          </a>
        </HeadShare>
      </HeadInfoShare>
    </HeadProp>
  );
};

export default DevelopmentsHeader;

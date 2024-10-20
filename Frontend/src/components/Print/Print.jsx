  import React from 'react';
  import QRCode from "react-qr-code";
  import './Print.css';
  import { formatToMoney } from "../../helpers/index.js";

  const Print = React.forwardRef(({ property, photoAmount }, ref) => {
    const photoGallery = property?.photos
      ?.filter(item => !item.is_blueprint)
      .map(item => ({
        src: `${item.image}`,
        loading: "lazy"
      }));

    return (
      <table className="property-pdf" id="pdfItem" ref={ref}>
        <thead>
          <tr>
            <th colSpan={2} style={{ display: "flex" }}>
              <div className="header">
                <img src="/images/print_logo.svg" alt="Belga" className="logo" />
                <div className="header-content">
                  <span className="address-title">{property.address}</span>
                  <span className="header-subtitle">{property.publication_title}</span>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={2}>
              <div className="center-column">
                <div className="main-title-container">
                  <div className="title-new">
                    <span className="address-title">{property.address}</span>
                    <p className="address-secundary-title">{property.type.name}<span></span> {property.location?.name}</p>
                  </div>
                  <div className="main-price-container">
                    <span className="main-price">
                      <span className="main-price-coin">{property?.operations[0]?.prices[0]?.currency}</span> 
                      <span className="price">{formatToMoney(property?.operations[0]?.prices[0]?.price)}</span>
                    </span>
                    <p className="rooms">{property.room_amount} {property.room_amount === 1 ? "Ambiente" : "Ambientes"} + {Math.round(property?.parking_lot_amount)} Cocheras</p>
                  </div>
                </div>
                <div className="grid-container">
                  <div className="main-image">
                    <img src={photoGallery[0]?.src} alt="Main property image" style={{ width: '100%', height: '100%' }} />
                  </div>
                  <div className="small-images">
                    {photoGallery.slice(1, 3).map((item, index) => (
                      <img key={index} src={item.src} alt={`Small property image ${index + 1}`} style={{ width: '100%', height: '30%' }} />
                    ))}
                    <QRCode size={80} value={`https://www.belga.com.ar/propiedad/${property.id.toString()}`} style={{ marginBottom: "30px" }} />
                    <span className="marca-agua">BLEGA INMOBILIARIA S.A.</span>
                  </div>
                </div>
                <div className="center-header">
                  <img src="/images/logo-print-new.png" alt="" className="img-logo" />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <div className="content-wrapper">
                <div className="left-column">
                  <div className="icon-list">
                    {Math.round(property?.total_surface) > 0 && (
                      <div className="icon-item">
                        <span className="icon-label">{Math.round(property?.total_surface)}</span>
                        <img src="/images/svg/m2.svg" className="icon-image" />
                      </div>
                    )}
                    {Math.round(property?.suite_amount) > 0 && (
                      <div className="icon-item">
                        <span className="icon-label">{Math.round(property?.suite_amount)}</span>
                        <img src="/images/svg/room.svg" className="icon-image" />
                      </div>
                    )}
                    {Math.round(property?.bathroom_amount) > 0 && (
                      <div className="icon-item">
                        <span className="icon-label">{Math.round(property?.bathroom_amount)}</span>
                        <img src="/images/svg/bath.svg" className="icon-image" />
                      </div>
                    )}
                    {Math.round(property?.parking_lot_amount) > 0 && (
                      <div className="icon-item">
                        <span className="icon-label">{Math.round(property?.parking_lot_amount)}</span>
                        <img src="/images/svg/car.svg" className="icon-image fix" />
                      </div>
                    )}
                  </div>
                  <div className="description-text" dangerouslySetInnerHTML={{ __html: property.rich_description }} />
                </div>
                <div className="right-column">
                  <div className="gallery-list fixes">
                    {photoGallery.slice(4, 8).map((item, index) => (
                      <div className="gallery-item" key={index}>
                        <img src={item.src} alt={`property image ${index + 1}`} style={{ width: '100%' }} />
                      </div>
                    ))}
                  </div>
                  <div className="gallery-list fixes">
                    {photoGallery.slice(8).map((item, index) => (
                      <div className="gallery-item" key={index}>
                        <img src={item.src} alt={`property image ${index + 5}`} style={{ width: '100%', height: '173px' }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2}>
              <div className="footer">
                {/* Footer content */}
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    );
  });

  export default Print;
import React from 'react';
import { Link } from "react-router-dom";
import { Textarea } from "../Textarea/Textarea.jsx";
import { TitleWithIcon } from "../TitleWithIcon/TitleWithIcon.jsx";
import { TelIcon, WhatsappIcon, MailIcon, LocationIcon } from "../Icons/Icons.jsx"; // Importar correctamente
import './FooterInfo.css';

const FooterInfo = () => {
    const data = [
        {
          id: 1,
          name: "Casa Central LA IMPRENTA",
          direction: "Gorostiaga 1601",
          direction_b: "(Esquina Migueletes)",
          loc: { lat: -34.5652519, lon: -58.4364415 },
        },
        {
          id: 2,
          name: "Sucursal BELGRANO C",
          direction: "Juramento 2102",
          direction_b: "1426 CABA",
          loc: { lat: -34.56051641836724, lon: -58.45384234503877 },
        },
        {
          id: 3,
          name: "Sucursal BELGRANO R",
          direction: "Superí 1485",
          direction_b: "(Esquina Av. de los Incas)",
          loc: { lat: -34.5735786974359, lon: -58.46109912564103 },
        },
      ];
    return (
        <div className="footer-info">
            <div className="left-info">
              <TitleWithIcon text="¿Querés contactarnos?" />

              <ul className="left-contact">
                <li className="contact-item">
                  <Link to="tel:+541152633393">
                    <p className="info--link">
                      <TelIcon /> +54 11 5263 3393
                    </p>
                  </Link>
                </li>
                <li className="contact-item">
                  <Link to="https://api.whatsapp.com/send?phone=5491152633393&text=Hola%20Belga!%20%F0%9F%91%8B%20Quisiera%20hacerles%20una%20consulta.">
                    <p className="info--link" target="_blank">
                      <WhatsappIcon /> +54 11 5263 3393
                    </p>
                  </Link>
                </li>
                <li className="contact-item">
                  <Link to="mailto:info@belga.com.ar">
                    <p className="info--link mail">
                      <MailIcon />
                      info@belga.com.ar
                    </p>
                  </Link>
                </li>
              </ul>

              <ul className="left-location">
                {data.map(item => (
                  <li
                    className="location-item mb-3"
                    key={item.id}
                    onMouseEnter={() => setHigh(item.id)}
                    onMouseLeave={() => setHigh(0)}
                  >
                    <div className="head-location">
                      <LocationIcon />
                      {item.name}
                    </div>
                    <div className="body-location">
                      <div className="loc">{item.direction}</div>
                      <div className="loc"> <p>{item.direction_b}</p></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
    );
};

export default FooterInfo;
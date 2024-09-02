import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { classes, getWindowDimensions } from "../../helpers/index.js";
import { PATHS, SOCIAL } from "../../../config/index.js";
import { TitleWithIcon } from "../TitleWithIcon/TitleWithIcon.jsx";
import {
  FacebookCircleIcon,
  InstaCircleIcon,
  LinkedinCircleIcon,
  LocationIcon,
  MailIcon,
  MessengerCircleIcon,
  TelIcon,
  WhatsappIcon,
  YoutubeCircleIcon,
} from "../Icons/Icons.jsx";
import BackToTop from "../BackToTop/BackToTop.jsx";
import ContactForm from "../Forms/ContactForm/ContactForm.jsx";
import './Footer.css';

export const Footer = ({ small = true, id, backToTopFooter }) => {
  const legalInfo = {
    text: "*Para los casos de alquiler de vivienda, el monto máximo de comisión que se le puede requerir a los propietarios será el equivalente al cuatro con quince centésimos por ciento (4,15%) del valor total del respectivo contrato. Se encuentra prohibido cobrar comisiones inmobiliarias y gastos de gestoría de informes a los inquilinos que sean personas físicas.",
    linkText: "Términos y Condiciones",
    link: `${PATHS.TERMINOS}`,
    mp: "CUCICBA Mat. 5111 CMCPSI Mat. 6528",
  };

  const socialInfo = [
    { link: `${SOCIAL.INSTA}`, icon: <InstaCircleIcon /> },
    { link: `${SOCIAL.FACEBOOK}`, icon: <FacebookCircleIcon /> },
    { link: `${SOCIAL.YOUTUBE}`, icon: <YoutubeCircleIcon /> },
    { link: `${SOCIAL.LINKEDIN}`, icon: <LinkedinCircleIcon /> },
    { link: `${SOCIAL.MESSENGER}`, icon: <MessengerCircleIcon /> },
  ];

  const [high, setHighB] = useState(0);
  const [center, setCenter] = useState({
    lat: -34.5608544,
    lon: -58.4557807,
    zoom: 13,
  });

  const setHigh = (n) => {
    setHighB(n);
    const item = data.find((item) => item.id === n);
    if (item) setCenter(item?.loc);
  };

  const data = [
    {
      id: 1,
      name: "Casa Central LA IMPRENTA",
      direction: "Gorostiaga 1601",
      direction_b: "(Esquina Migueletes)",
      loc: { lon: -58.4364415, lat: -34.5652519, zoom: 15.5 },
    },
    {
      id: 2,
      name: "Sucursal BELGRANO C",
      direction: "Juramento 2102",
      direction_b: "1426 CABA",
      loc: { lat: -34.56051641836724, lon: -58.45384234503877, zoom: 15.5 },
    },
    {
      id: 3,
      name: "Sucursal BELGRANO R",
      direction: "Superí 1485",
      direction_b: "(Esquina Av. de los Incas)",
      loc: { lat: -34.5735786974359, lon: -58.46109912564103, zoom: 15.5 },
    },
  ];

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  useEffect(() => {
    const handleResize = () => setWindowDimensions(getWindowDimensions());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [BackContainerHeight, setBackContainerHeight] = useState();
  const footerWrapper = useRef(null);

  useEffect(() => {
    setBackContainerHeight(footerWrapper?.current?.offsetHeight);
  }, [windowDimensions]);

  return (
    <footer className={`footer-container ${classes({ small })}`} id={id}>
      {backToTopFooter && (
        <div className="back-container" style={{ height: BackContainerHeight }}>
          <BackToTop color="yellow" />
        </div>
      )}
      <div className="footer-wrapper" ref={footerWrapper}>
        <div className="footer-left">
          <div className="footer-info">
            <div className="left-info">
              <TitleWithIcon text="¿Querés contactarnos?" />

              <ul className="left-contact">
                <li className="contact-item">
                  <Link to="tel:+541152633393">
                    <span className="info--link">
                      <TelIcon /> +54 11 5263 3393
                    </span>
                  </Link>
                </li>
                <li className="contact-item">
                  <Link to="https://api.whatsapp.com/send?phone=5491152633393&text=Hola%20Belga!%20%F0%9F%91%8B%20Quisiera%20hacerles%20una%20consulta.">
                    <span className="info--link" target="_blank">
                      <WhatsappIcon /> +54 11 5263 3393
                    </span>
                  </Link>
                </li>
                <li className="contact-item">
                  <Link to="mailto:info@belga.com.ar">
                    <span className="info--link mail">
                      <MailIcon />
                      info@belga.com.ar
                    </span>
                  </Link>
                </li>
              </ul>

              <ul className="left-location">
                {data.map(item => (
                  <li
                    className="location-item"
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
                      <div className="loc">{item.direction_b}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="footer-info-bottom">
            <div className="social-list">
              {socialInfo.map((i, k) => (
                <Link to={`${i?.link.toString()}`} key={k}>
                  <span className="social--link" target="_blank">
                    {i.icon}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-center">
          <div className="footer-info">
            {/* Se eliminó la sección de DynamicMap */}
          </div>
          <div className="footer-info-bottom">
            <img
              className="brand-footer"
              src="/images/brand_red.svg"
              alt="Belga inmobiliaria"
              title="Belga inmobiliaria"
              loading="lazy"
            />
            <div className="social-list-mobile-wrapper">
              <div className="social-list">
                {socialInfo.map((i, k) => (
                  <Link to={`${i?.link.toString()}`} key={k}>
                    <span className="social--link" target="_blank">
                      {i.icon}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="footer-right">
          <div className="footer-info">
            <div className="right-info">
              <ContactForm className="contact--form-footer" />
            </div>
          </div>
          <div className="footer-info-bottom">
            <div className="right-info">
              <div className="legal-text">{legalInfo.text}</div>
              <div className="legal-link">
                <Link to={legalInfo.link}>
                  <span>{legalInfo.linkText}</span>
                </Link>
              </div>
              <div className="mp">{legalInfo.mp}</div>
            </div>
          </div>
        </div>

        <div className="right-info-mobile">
          <div className="legal-text">{legalInfo.text}</div>
          <div className="legal-link">
            <Link to={legalInfo.link}>
              <span>{legalInfo.linkText}</span>
            </Link>
          </div>
          <div className="mp">{legalInfo.mp}</div>
        </div>

        <div className="footer-info-bottom brand--mobile">
          <div className="social-list-mobile-wrapper">
            <div className="social-list">
              {socialInfo.map((i, k) => (
                <Link to={`${i?.link.toString()}`} key={k}>
                  <span className="social--link" target="_blank">
                    {i.icon}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <div className="brand-mobile-wrapper">
            <img
              className="brand-footer"
              src="/images/brand_red.svg"
              alt="Belga inmobiliaria"
              title="Belga inmobiliaria"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

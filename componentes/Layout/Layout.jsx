import React from "react";
import "./Layout.css"; // Archivo CSS para los estilos globales y específicos
//import { Menu } from "../../Frontend/src/components/Menu/Menu.jsx";
//import Footer from "../../Frontend/src/components/Footer/Footer.jsx";
//import { MailIconSend, TelIcon, WhatsappIcon } from "../../Frontend/src/components/Icons/Icons.jsx";

const Layout = ({ children, menuTheme, footerSmall }) => {
  return (
    <div className="layout-wrapper">
      <Menu theme={menuTheme} />
      {children} {/* Aquí se renderizan las rutas */}
      <Footer small={footerSmall} id="contacto" />
      <div className="hero-footer" id="menuFooter">
        <a href="tel:+541152633393" className="head-footer-link phone">
          <TelIcon />
        </a>
        <a href="mailto:info@belga.com.ar" className="head-footer-link mail">
          <MailIconSend />
        </a>
        <a
          href="https://api.whatsapp.com/send?phone=5491152633393&text=Hola%20Belga!%20%F0%9F%91%8B%20Quisiera%20hacerles%20una%20consulta."
          className="head-footer-link wsp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsappIcon />
        </a>
      </div>
    </div>
  );
};

export default Layout;

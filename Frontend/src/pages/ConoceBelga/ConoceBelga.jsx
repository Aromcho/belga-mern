import React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { PATHS } from "../../../config/index.js";
import { classes, truncateWithEllipsis } from "../../helpers/index.js";
import { useMergeState } from "../../helpers/hooks.js";
import Lightbox from "react-spring-lightbox";
import Layout from "../../components/Layout/Layout.jsx";
import { ArrowBackIcon, ArrowSubmitIcon, CloseIcon } from "../../components/Icons/Icons.jsx";
import SocialSidebar from "../../components/SocialSidebar/SocialSidebar.jsx";
import BackToTop from "../../components/BackToTop/BackToTop.jsx";
import { MemberCard } from "./MemberCard/MemberCard.jsx";
import { QuoteCard } from "./QuoteCard/QuoteCard.jsx";
import FormContact from "../../components/FormContact/FormContact.jsx";
import ContactForm from "../../components/Forms/ContactForm/ContactForm.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Container } from "react-bootstrap";
import { VenderForm } from "../../components/Forms/VenderForm/VenderForm.jsx";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./ConoceBelga.css"; // Importar el CSS de forma clásica

const ConoceBelga = observer(() => {
  const [activeSection, setActiveSection] = React.useState("");
  const [modalContent, setModalContent] = useMergeState({ open: false, content: "fotos" });
  const [currentImageIndex, setCurrentIndex] = React.useState(0);

  const onClose = () => setModalContent({ open: false });
  const gotoPrevious = () => currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1);
  const gotoNext = () =>
    currentImageIndex + 1 < (modalContent.content === "fotos" && photoGallery.length) &&
    setCurrentIndex(currentImageIndex + 1);

  const photos = ["/images/servicios_fotos.jpg", "/images/servicios_planos.jpg"];
  const photoGallery = photos?.map((image) => ({ src: `${image}`, loading: "lazy", alt: `${image}` }));

  return (
    <Layout menuTheme="light" footerSmall backToTopFooter>
      <div className="cb-container">
        <div className="cb-hero-wrapper" style={{ backgroundImage: `url(/images/nosotros_hero.jpg)` }}>
          <div className="cb-black-layer"></div>
          <div className="cb-hero">
            <SocialSidebar />
          </div>
            <div className="cb-menu-hero">
              <a className={classes({ active: activeSection === "historia" })} href="#historia">
                <div className="cb-menu-hero-text">Historia</div>
              </a>
              <a className={classes({ active: activeSection === "valores" })} href="#valores">
                <div className="cb-menu-hero-text">Valores</div>
              </a>
              <a className={classes({ active: activeSection === "belga" })} href="#belga">
                <div className="cb-menu-hero-text">Somos Belga</div>
              </a>
              <a className={classes({ active: activeSection === "servicios" })} href="#servicios">
                <div className="cb-menu-hero-text">Servicios</div>
              </a>
              <a className={classes({ active: activeSection === "oficinas" })} href="#oficinas">
                <div className="cb-menu-hero-text">Oficinas</div>
              </a>
            </div>
        </div>

        <Container>
          <div className="cb-back-wrapper">
            <Link className="text-black" to={PATHS.ROOT}>
              <ArrowBackIcon />
              Volver al inicio
            </Link>
          </div>
        </Container>

        <div className="cb-sidebar-container">
          <div className="cb-sidebar-red">
            <SocialSidebar color="red" />
            <BackToTop color="red" />
          </div>

          <section
            className="cb-historia-section"
            id="historia"
            onMouseOver={() => setActiveSection("historia")}
            onMouseLeave={() => setActiveSection("")}
          >
            <Container>
              <div className="cb-historia-wrapper">
                <div className="cb-historia-left">
                  <img className="cb-historia-gif" src="/images/65_historia.gif" loading="lazy" />
                </div>
                <div className="cb-historia-right">
                  <div className="cb-historia-text-wrapper">
                    <div className="cb-underline-title">
                      Una <u>Historia</u> Belga
                    </div>
                    <p className="cb-historia-text">
                    Belga comienza su historia con nuestro fundador Jorge Jooris en 1957. Recién llegado desde Bélgica con un puñado de costumbres y tradiciones familiares al barrio de Belgrano ubicado en la Ciudad Autónoma de Buenos Aires. Un hombre apasionado por su profesión que supo conectar a cientos de personas con los que terminarían siendo sus nuevos hogares. Una pasión que transmitió a la siguiente y actual generación.                    
                    </p>
                    <p className="cb-historia-text">
                    Belgrano y Palermo son las sedes dónde tenemos nuestras 3 casas, nuestros hogares, cómo nos gusta llamarles. Barrios que fueron y son testigos del esfuerzo, la dedicación y el compromiso que nos sigue haciendo crecer, y acompañando después de 65 años.                    
                    </p>
                    <p className="cb-historia-text">
                    Hoy contamos con un cálido grupo humano de profesionales destacados que brindan al mercado un asesoramiento inmobiliario distinguido.                    
                    </p>
                    <p className="cb-historia-text">
                    Somos el lugar donde nacen las historias.                    
                    </p>
                  
                  </div>
                </div>
              </div>
            </Container>
          </section>

          <section className="cb-valores-section">
            <Container>
              <div className="cb-underline-title">Los <u>Valores</u> que heredamos</div>
              <div className="cb-valores-list">
                <div className="cb-valores-wrapper">
                  <div className="cb-valores-list-title">Una tradición familiar.</div>
                  <div className="cb-valores-list-text">Somos una empresa reconocida por su trato familiar. Una de nuestras prioridades es mantener un trato personalizado que nos permita entender y empatizar con cada situación, buscando como resultado que nuestros clientes se sientan acompañados en todas las etapas de cada operación.</div>
                </div>
                <div className="cb-valores-wrapper">
                  <div className="cb-valores-list-title">Una puerta abierta.</div>
                  <div className="cb-valores-list-text">Creemos fielmente que la confianza y la honestidad son los pilares fundamentales de cualquier forma de trabajo. Es por esto que, a través de todos estos años, hemos cosechado fuertes lazos con todos nuestros clientes, manteniendo absoluta transparencia en todas nuestras operaciones.</div>
                </div>
                <div className="cb-valores-wrapper">
                  <div className="cb-valores-list-title">Un desarrollo constante.</div>
                  <div className="cb-valores-list-text">El crecimiento siempre viene acompañado del aprendizaje. En un mundo donde los cambios son constantes, es imprescindible capacitarnos regularmente para estar conectados y actualizarnos con las últimas tendencias en tecnología. Es por eso que ofrecemos servicios de excelencia.</div>
                </div>
              </div>
            </Container>
          </section>

          <section className="cb-quotes-section">
              <div className="cb-quote-list">
                <QuoteCard className="cb-quote" rating={4} quote={"Hoy 22/6 se concretó la operación de compra-venta. Un Placer trabajar con Inmobiliaria Belga. Todo salió perfecto, a tiempo y lo mejor de todo es la gente que trabaja, que hace de la inmobiliaria un lugar de confianza y prestigio. Estoy muy agradecida a todos desde las chicas que te reciben en el local, hasta los agentes inmobiliarios especialmente Martín que fue el que acompañó el proceso. Graci..."} author="Andrea Gallis" logo="/images/google_logo.png" link="#" />
                <QuoteCard className="cb-quote" rating={5} quote={"Profesionalismo y calidez humana. Desde el primer día que Lucas vino a tasar nuestro departamento hasta el ultimo cuando firmamos la escritura con Martin, la experiencia con todo el equipo de Belga fue excelente. Mica, Gonzalo, Alejandrina, Gabriela, siempre dispuestos a ayudar y poniendo la mejor onda, incluso en tiempos donde concretar una operación inmobiliaria no es nada sencillo. Sin dudas se..."} author="Favio Novello" logo="/images/google_logo.png" link="#" />
              </div>
          </section>

          <section className="cb-somos-belga-section">
            <Container>
              <div className="cb-underline-title"><u>Somos Belga</u></div>
              <div className="cb-staff-list">
                <div className="cb-staff-item">
                  <div className="cb-left-content">
                    <span className="cb-name">Martín Gallegos</span>
                    <span className="cb-low-name cb-desktop">CEO | CUCICBA 5111 - CMCPSI 6528</span>
                  </div>
                  <div className="cb-right-content">
                    <img className="cb-staff-image" src="/images/new/martin.png" loading="lazy" />
                  </div>
                </div>
                <div className="cb-staff-item">
                  <div className="cb-left-content">
                    <span className="cb-name">Lucas Jooris</span>
                    <span className="cb-low-name cb-desktop">CEO | CUCICBA 8347</span>
                  </div>
                  <div className="cb-right-content">
                    <img className="cb-staff-image" src="/images/new/lucas.png" loading="lazy" />
                  </div>
                </div>
              </div>
            </Container>
          </section>

          <section className="cb-servicios-section">
            <Container>
              <div className="cb-underline-title">Los <u>Servicios</u> que ofrecemos</div>
            </Container>

            <Container>
              <Lightbox
                className="cb-servicios-gallery"
                isOpen={modalContent.open}
                onPrev={gotoPrevious}
                onNext={gotoNext}
                images={photoGallery}
                currentIndex={currentImageIndex}
                onClose={onClose}
                style={{ background: "rgba(0,0,0,0.95)", zIndex: 99999999 }}
                singleClickToZoom
                renderPrevButton={() => (
                  <div className={classes("cb-arrow-gallery cb-arrow-prev", { disabled: currentImageIndex === 0 })} onClick={gotoPrevious}>
                    <ArrowSubmitIcon className="cb-gallery-arrow" />
                  </div>
                )}
                renderNextButton={() => (
                  <div className={classes("cb-arrow-gallery cb-arrow-next", { disabled: currentImageIndex + 1 === photoGallery.length })} onClick={gotoNext}>
                    <ArrowSubmitIcon className="cb-gallery-arrow" />
                  </div>
                )}
                renderHeader={() => (
                  <div className="cb-header-gallery">
                    <div className="cb-index-counter">
                      {currentImageIndex + 1} de {photoGallery.length}
                    </div>
                    <CloseIcon onClick={onClose} className="cb-gallery-close-icon" />
                  </div>
                )}
              />

              <div className="cb-swiper-container-gallery">
              <Swiper
                  className="cb-servicios-gallery"
                  loop={true} 
                  centeredSlides={false} // Centrar los elementos para un deslizamiento más natural
                  spaceBetween={10} // Reducir el espacio entre elementos
                  slidesPerView={1.5} // Mostrar un elemento y medio, cambiando dinámicamente
                  grabCursor={true} 
                  touchRatio={1.5} // Ajustar la sensibilidad del arrastre
                  resistance={true} // Añadir resistencia al final del arrastre
                  resistanceRatio={0.85} // Ratio de resistencia para suavidad
                  breakpoints={{
                    740: {
                      slidesPerView: 1.2, // Ajuste para pantallas medianas
                    },
                    992: {
                      slidesPerView: 2.5, // Ajuste para pantallas grandes
                    },
                  }}
                >
                  <SwiperSlide>
                    <div className="cb-service-wrapper">
                      <div className="cb-service-title">Video Drone</div>
                      <div className="cb-service-media">
                        <iframe className="w-100 h-100" src="https://www.youtube.com/embed/Yc8pUaq8Zsg" />
                      </div>
                    </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className="cb-service-wrapper">
                      <div className="cb-service-title">Fotos</div>
                      <div className="cb-service-media">
                        <img className="w-100 h-100" src="/images/servicios_fotos.jpg" />
                      </div>
                    </div>
                     </SwiperSlide>
                    <SwiperSlide>
                    <div className="cb-service-wrapper">
                      <div className="cb-service-title">Tour Virtual</div>
                      <div className="cb-service-media">
                      <iframe className="w-100 h-100" src="https://matterport.com/discover/space/BB1DiUzwnhk" />
                      </div>
                    </div> </SwiperSlide>
                    <SwiperSlide><div className="cb-service-wrapper">
                      <div className="cb-service-title">Planos</div>
                      <div className="cb-service-media">
                        <img className="w-100 h-100" src="/images/servicios_planos.jpg" />
                      </div>
                    </div> </SwiperSlide>

                    
                    
                    
                  
                </Swiper>
              </div>
            </Container>

            <Container>
              <div className="cb-portales-container">
                <div className="cb-portales-list">
                  <div className="cb-portal-item">
                    <img className="cb-portal-img" src="/images/portales_zonaprop.png" />
                    <div className="cb-portal-name">Zona Prop</div>
                  </div>
                  <div className="cb-portal-item">
                    <img className="cb-portal-img" src="/images/portales_meli.png" />
                    <div className="cb-portal-name">Mercado Libre</div>
                  </div>
                  <div className="cb-portal-item">
                    <img className="cb-portal-img" src="/images/portales_argenprop.png" />
                    <div className="cb-portal-name">Argenprop</div>
                  </div>
                  <div className="cb-portal-item">
                    <img className="cb-portal-img" src="/images/portales_properati.png" />
                    <div className="cb-portal-name">Properati</div>
                  </div>
                </div>
                <div className="cb-portales-footer">PUBLICACIÓN EN PORTALES</div>
              </div>
              
            </Container>
          </section>

          <section className="cb-oficinas-section">
            <Container>
              <div className="cb-underline-title">Nuestras <u>Oficinas</u>, nuestras casas</div>
            </Container>

            <div className="cb-main-office">
              <div className="cb-main-office-img" style={{ backgroundImage: `url(/images/oficina_la_imprenta.jpg)` }}></div>
              <div className="cb-office-main-text">
                <div className="cb-office-text-wrapper">
                  <div className="cb-office-text-name">La Imprenta</div>
                  <div className="cb-office-text-loc">Gorostiaga 1601</div>
                  <div className="cb-office-text">Nuestra oficina sede, nuestra casa central. La más jóven de las 3 oficinas se encuentra ubicada en el corazón de La Imprenta, en Palermo. Un gran equipo te espera, ¡Vení a conocerla!</div>
                </div>
              </div>
            </div>

            <div className="cb-office-list">
              <div className="cb-office-list-item">
                <div className="cb-office-text-wrapper">
                  <div className="cb-office-text-name">BELGRANO C</div>
                  <div className="cb-office-text-loc">Juramento 2102</div>
                  <div className="cb-office-text">Te esperamos en el centro de Belgrano, a 2 cuadras del reconocido cruce de Av. Cabildo con Juramento.</div>
                </div>
                <div className="cb-office-text-wrapper">
                  <div className="cb-office-text-name">BELGRANO R</div>
                  <div className="cb-office-text-loc">Superí 1485</div>
                  <div className="cb-office-text">Nos encontramos a metros de una de las calles más hermosas de Belgrano, Av. de los Incas. ¡Vení a visitarnos!</div>
                </div>
              </div>
            </div>
          </section>

          <div className="cb-form-wrapper">
            <Container>
              <ContactForm />
            </Container>
          </div>
        </div>
      </div>
    </Layout>
  );
});

export default ConoceBelga;

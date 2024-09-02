import React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { PATHS } from "../../../config/index.js";
import { classes, truncateWithEllipsis } from "../helpers";
import { useMergeState } from "../helpers/hooks";
import Lightbox from "react-spring-lightbox";
import { Layout, Container } from "../components/Layout/Layout.jsx";
import { ArrowBackIcon, ArrowSubmitIcon, CloseIcon } from "../components/Icons/Icons.jsx";
import { SocialSidebar } from "../components/SocialSidebar/SocialSidebar.jsx";
import { BackToTop } from "../components/BackToTop/BackToTop.jsx";
import { MemberCard } from "../components/Pages/Conoce/MemberCard.jsx";
import { QuoteCard } from "../components/Pages/Conoce/QuoteCard.jsx";
import { ContactForm } from "../components/Forms/ContactForm.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
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
      <div className="conoce-belga-container">
        <div className="hero-wrapper" style={{ backgroundImage: `url(/images/nosotros_hero.jpg)` }}>
          <div className="black-layer"></div>
          <div className="hero">
            <SocialSidebar />
          </div>
          <Container>
            <div className="menu-hero">
              <a className={classes({ active: activeSection === "historia" })} href="#historia">
                <div className="menu-hero-text">Historia</div>
              </a>
              <a className={classes({ active: activeSection === "valores" })} href="#valores">
                <div className="menu-hero-text">Valores</div>
              </a>
              <a className={classes({ active: activeSection === "belga" })} href="#belga">
                <div className="menu-hero-text">Somos Belga</div>
              </a>
              <a className={classes({ active: activeSection === "servicios" })} href="#servicios">
                <div className="menu-hero-text">Servicios</div>
              </a>
              <a className={classes({ active: activeSection === "oficinas" })} href="#oficinas">
                <div className="menu-hero-text">Oficinas</div>
              </a>
            </div>
          </Container>
        </div>

        <Container>
          <div className="back-wrapper">
            <Link to={PATHS.ROOT}>
              <ArrowBackIcon />
              Volver al inicio
            </Link>
          </div>
        </Container>

        <div className="sidebar-container">
          <div className="sidebar-red">
            <SocialSidebar color="red" />
            <BackToTop color="red" />
          </div>

          <section
            className="historia-section"
            id="historia"
            onMouseOver={() => setActiveSection("historia")}
            onMouseLeave={() => setActiveSection("")}
          >
            <Container>
              <div className="historia-wrapper">
                <div className="historia-left">
                  <img className="historia-gif" src="/images/65_historia.gif" loading="lazy" />
                </div>
                <div className="historia-right">
                  <div className="historia-text-wrapper">
                    <div className="underline-title">
                      Una <u>Historia</u> Belga
                    </div>
                    <p className="historia-text">
                      Belga comienza su historia con nuestro fundador Jorge Jooris en 1957...
                    </p>
                    {/* Rest of the text */}
                  </div>
                </div>
              </div>
            </Container>
          </section>

          <section className="valores-section">
            <Container>
              <div className="underline-title">Los <u>Valores</u> que heredamos</div>
              <div className="valores-list">
                <div className="valores-wrapper">
                  <div className="valores-list-title">Una tradición familiar.</div>
                  <div className="valores-list-text">Somos una empresa reconocida por su trato familiar...</div>
                </div>
                {/* More valores */}
              </div>
            </Container>
          </section>

          <section className="quotes-section">
            <Container>
              <div className="quote-list">
                <QuoteCard className="quote" rating={4} quote={truncateWithEllipsis("Hoy 22/6 se concretó la operación...", 400)} author="Andrea Gallis" logo="/images/google_logo.png" link="#" />
                <QuoteCard className="quote" rating={5} quote={truncateWithEllipsis("Profesionalismo y calidez humana...", 400)} author="Favio Novello" logo="/images/google_logo.png" link="#" />
              </div>
            </Container>
          </section>

          <section className="somos-belga-section">
            <Container>
              <div className="underline-title"><u>Somos Belga</u></div>
              <div className="staff-list">
                <div className="staff-item">
                  <div className="left-content">
                    <span className="name">Martín Gallegos</span>
                    <span className="low-name desktop">CEO | CUCICBA 5111 - CMCPSI 6528</span>
                    <span className="low-name mobile">CEO</span>
                    <span className="low-name mobile">CUCICBA 5111 - CMCPSI 6528</span>
                  </div>
                  <div className="right-content">
                    <img className="staff-image" src="/images/new/martin.png" loading="lazy" />
                  </div>
                </div>
                {/* More staff items */}
              </div>
            </Container>
          </section>

          <section className="servicios-section">
            <Container>
              <div className="underline-title">Los <u>Servicios</u> que ofrecemos</div>
            </Container>

            <Container>
              <Lightbox
                className="servicios-gallery"
                isOpen={modalContent.open}
                onPrev={gotoPrevious}
                onNext={gotoNext}
                images={photoGallery}
                currentIndex={currentImageIndex}
                onClose={onClose}
                style={{ background: "rgba(0,0,0,0.95)", zIndex: 99999999 }}
                singleClickToZoom
                renderPrevButton={() => (
                  <div className={classes("arrow-gallery arrow-prev", { disabled: currentImageIndex === 0 })} onClick={gotoPrevious}>
                    <ArrowSubmitIcon className="gallery-arrow" />
                  </div>
                )}
                renderNextButton={() => (
                  <div className={classes("arrow-gallery arrow-next", { disabled: currentImageIndex + 1 === photoGallery.length })} onClick={gotoNext}>
                    <ArrowSubmitIcon className="gallery-arrow" />
                  </div>
                )}
                renderHeader={() => (
                  <div className="header-gallery">
                    <div className="index-counter">
                      {currentImageIndex + 1} de {photoGallery.length}
                    </div>
                    <CloseIcon onClick={onClose} className="gallery-close-icon" />
                  </div>
                )}
              />

              <div className="swiper-container-gallery">
                <Swiper
                  className="swiper-services-gallery"
                  modules={[]}
                  loop={true}
                  centeredSlides={false}
                  allowTouchMove={true}
                  loopAdditionalSlides={4}
                  grabCursor={true}
                  draggable={true}
                  spaceBetween={20}
                  breakpoints={{
                    740: { slidesPerView: 2, autoplay: { delay: 4000 }, centeredSlides: true },
                    992: { slidesPerView: 2.5 },
                  }}
                >
                  <SwiperSlide>
                    <div className="service-wrapper">
                      <div className="service-title">Video Drone</div>
                      <div className="service-media">
                        <iframe src="https://www.youtube.com/embed/Yc8pUaq8Zsg" />
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide onClick={() => { setModalContent({ open: true }); setCurrentIndex(0); }}>
                    <div className="service-wrapper">
                      <div className="service-title">Fotos</div>
                      <div className="service-media">
                        <div className="service-media-img" style={{ backgroundImage: `url(/images/servicios_fotos.jpg)` }}></div>
                      </div>
                    </div>
                  </SwiperSlide>
                  {/* More slides */}
                </Swiper>
              </div>
            </Container>

            <Container>
              <div className="portales-container">
                <div className="portales-list">
                  <div className="portal-item">
                    <img className="portal-img" src="/images/portales_zonaprop.png" />
                    <div className="portal-name">Zona Prop</div>
                  </div>
                  {/* More portals */}
                </div>
                <div className="portales-footer">PUBLICACIÓN EN PORTALES</div>
              </div>
            </Container>
          </section>

          <section className="oficinas-section">
            <Container>
              <div className="underline-title">Nuestras <u>Oficinas</u>, nuestras casas</div>
            </Container>

            <div className="main-office">
              <div className="main-office-img" style={{ backgroundImage: `url(/images/oficina_la_imprenta.jpg)` }}></div>
              <div className="office-main-text">
                <div className="office-text-wrapper">
                  <div className="office-text-name">La Imprenta</div>
                  <div className="office-text-loc">Gorostiaga 1601</div>
                  <div className="office-text">Nuestra oficina sede, nuestra casa central...</div>
                </div>
              </div>
            </div>

            <div className="office-list">
              <div className="office-list-item">
                <div className="office-text-wrapper">
                  <div className="office-text-name">BELGRANO C</div>
                  <div className="office-text-loc">Juramento 2102</div>
                  <div className="office-text">Te esperamos en el centro de Belgrano...</div>
                </div>
              </div>
              {/* More offices */}
            </div>
          </section>

          <div className="form-wrapper">
            <Container>
              <ContactForm full />
            </Container>
          </div>
        </div>
      </div>
    </Layout>
  );
});

export default ConoceBelga;

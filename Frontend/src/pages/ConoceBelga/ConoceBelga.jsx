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
import { Swiper, SwiperSlide } from "swiper/react";
import { Container } from "react-bootstrap";
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
          <Container>
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
          </Container>
        </div>

        <Container>
          <div className="cb-back-wrapper">
            <Link to={PATHS.ROOT}>
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
                      Belga comienza su historia con nuestro fundador Jorge Jooris en 1957...
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
                  <div className="cb-valores-list-text">Somos una empresa reconocida por su trato familiar...</div>
                </div>
              </div>
            </Container>
          </section>

          <section className="cb-quotes-section">
            <Container>
              <div className="cb-quote-list">
                <QuoteCard className="cb-quote" rating={4} quote={truncateWithEllipsis("Hoy 22/6 se concretó la operación...", 400)} author="Andrea Gallis" logo="/images/google_logo.png" link="#" />
                <QuoteCard className="cb-quote" rating={5} quote={truncateWithEllipsis("Profesionalismo y calidez humana...", 400)} author="Favio Novello" logo="/images/google_logo.png" link="#" />
              </div>
            </Container>
          </section>

          <section className="cb-somos-belga-section">
            <Container>
              <div className="cb-underline-title"><u>Somos Belga</u></div>
              <div className="cb-staff-list">
                <div className="cb-staff-item">
                  <div className="cb-left-content">
                    <span className="cb-name">Martín Gallegos</span>
                    <span className="cb-low-name cb-desktop">CEO | CUCICBA 5111 - CMCPSI 6528</span>
                    <span className="cb-low-name cb-mobile">CEO</span>
                    <span className="cb-low-name cb-mobile">CUCICBA 5111 - CMCPSI 6528</span>
                  </div>
                  <div className="cb-right-content">
                    <img className="cb-staff-image" src="/images/new/martin.png" loading="lazy" />
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
                  className="cb-swiper-services-gallery"
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
                    <div className="cb-service-wrapper">
                      <div className="cb-service-title">Video Drone</div>
                      <div className="cb-service-media">
                        <iframe src="https://www.youtube.com/embed/Yc8pUaq8Zsg" />
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide onClick={() => { setModalContent({ open: true }); setCurrentIndex(0); }}>
                    <div className="cb-service-wrapper">
                      <div className="cb-service-title">Fotos</div>
                      <div className="cb-service-media">
                        <div className="cb-service-media-img" style={{ backgroundImage: `url(/images/servicios_fotos.jpg)` }}></div>
                      </div>
                    </div>
                  </SwiperSlide>
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
                  <div className="cb-office-text">Nuestra oficina sede, nuestra casa central...</div>
                </div>
              </div>
            </div>

            <div className="cb-office-list">
              <div className="cb-office-list-item">
                <div className="cb-office-text-wrapper">
                  <div className="cb-office-text-name">BELGRANO C</div>
                  <div className="cb-office-text-loc">Juramento 2102</div>
                  <div className="cb-office-text">Te esperamos en el centro de Belgrano...</div>
                </div>
              </div>
            </div>
          </section>

          <div className="cb-form-wrapper">
            <Container>
              <FormContact full />
            </Container>
          </div>
        </div>
      </div>
    </Layout>
  );
});

export default ConoceBelga;

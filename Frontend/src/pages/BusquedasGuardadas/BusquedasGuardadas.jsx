import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dynamic from "react-dynamic-import";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store/UserStore.jsx";
import { PATHS } from "../config";

import { Layout, Container } from "../components/layout";
import { ArrowBackIcon } from "../components/icons";

const BusquedaCard = dynamic(() => import("../components/busquedacard").then((mod) => mod.BusquedaCard));
const Status = dynamic(() => import("../components/status").then((mod) => mod.Status));
const ContactForm = dynamic(() => import("../components/forms/contactform").then((mod) => mod.ContactForm));

import {
  BackWrapper,
  BusquedasContainer,
  FormWrapper,
  Title,
  BusquedasList,
  Subtitle,
} from "../components/pages/busquedasGuardadas.styles";

const BusquedasGuardadas = observer(() => {
  const {
    rootStore: { userStore },
  } = useStore();

  const [saveSearch, setSaveSearch] = useState<number>(0);

  useEffect(() => {
    setSaveSearch(userStore?.searchs?.length);
  }, [userStore, saveSearch]);

  return (
    <Layout>
      <BusquedasContainer>
        <Container>
          <BackWrapper>
            <Link to={PATHS.ROOT}>
              <ArrowBackIcon />
              Volver al inicio
            </Link>
          </BackWrapper>
        </Container>
        <Container>
          {saveSearch === 0 && (
            <Status
              img="/images/empty_img_plus.gif"
              text="Tené a mano tus búsquedas."
              textButton="AGREGÁ TUS BÚSQUEDAS"
              buttonStyle="secondary shine"
              linkButton={PATHS.VENTA}
            />
          )}

          {saveSearch > 0 && (
            <>
              <Container>
                <Title>TUS BÚSQUEDAS GUARDADAS</Title>
              </Container>

              <BusquedasList>
                {userStore.searchs.slice().reverse()?.map((item, key) => (
                  <BusquedaCard
                    key={key}
                    search={item}
                    onRemove={() => {
                      userStore.removeSearch(item),
                        setSaveSearch(saveSearch > 0 ? saveSearch - 1 : 0);
                    }}
                  />
                ))}
              </BusquedasList>

              <Container>
                <Subtitle>Encontrá lo que estás buscando.</Subtitle>
              </Container>
              <FormWrapper>
                <ContactForm full />
              </FormWrapper>
            </>
          )}
        </Container>
      </BusquedasContainer>
    </Layout>
  );
});

export default BusquedasGuardadas;

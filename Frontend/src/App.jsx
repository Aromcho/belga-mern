import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import Home from "./pages/Home/Home.jsx";
import Menu from "./components/Menu/Menu.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer.jsx";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer.jsx";
import BusquedasGuardadas from "./pages/BusquedasGuardadas/BusquedasGuardadas.jsx";
import ConoceBelga from "./pages/ConoceBelga/ConoceBelga.jsx";
import Emprendimientos from "./pages/Emprendimientos/Emprendimientos.jsx";
import Favorites from "./pages/Favorites/Favorites.jsx";
import QuieroVender from "./pages/QuieroVender/QuieroVender.jsx";
import TerminosYCondiciones from "./pages/Terminos/TerminosYCondiciones.jsx";
import Error404 from "./pages/404/404.jsx";
import Error500 from "./pages/500/500.jsx";
import { FiltersProvider } from './context/FiltersContext';
import { AuthProvider } from './context/AuthContext';
import DevelopmentsDetail from "./components/DevelopmentsDetail/DevelopmentsDetail.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import Blog from "./pages/Blog/Blog.jsx";
import Layout from "./components/Layout/Layout.jsx";
import BlogDetail from "./pages/Blog/BlogDetail/BlogDetail.jsx";
import Print from "./components/Print/Print.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import ReactGA from 'react-ga4';

function App() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);

  return (
    <>
      <Helmet>
        <title>Belga Inmobiliaria</title>
        <meta name="description" content="Encuentra las mejores propiedades en Belga Inmobiliaria." />
        <meta property="og:title" content="Belga Inmobiliaria" />
        <meta property="og:description" content="Encuentra las mejores propiedades en Belga Inmobiliaria." />
        <meta property="og:image" content="/path/to/default-image.jpg" />
      </Helmet>
      <AuthProvider>
        <FiltersProvider>
          <Menu />
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/propertylist" element={<ItemListContainer />} />
              <Route path="/propiedad/:id" element={<ItemDetailContainer />} />
              <Route path="/propertyDetail/:id" element={<ItemDetailContainer />} />
              <Route path="/404" element={<Error404 />} />
              <Route path="/500" element={<Error500 />} /> 
              <Route path="/quiero-vender" element={<QuieroVender />} />
              <Route path="/emprendimientos" element={<Emprendimientos />} />
              <Route path="/emprendimientos/:id" element={<DevelopmentsDetail />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/print" element={<Print />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/venta/:tipo" element={<ItemListContainer />} />
              <Route path="*" element={<Navigate to="/404" />} />
              <Route path="/conoce-belga" element={<ConoceBelga />} />
              <Route path="/terminos-y-condiciones" element={<TerminosYCondiciones />} />
              <Route path="/busquedas-guardadas" element={<BusquedasGuardadas />} />
              <Route path="/favorites" element={<Favorites />} />  
            </Routes>
          </Layout>
          <Footer />
        </FiltersProvider>
      </AuthProvider>
    </>
  );
}

export default App;

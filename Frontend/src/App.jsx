import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Menu from "./components/Menu/Menu.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer.jsx";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer.jsx";
// import BusquedasGuardadas from "./pages/BusquedasGuardadas/BusquedasGuardadas.jsx";
import ConoceBelga from "./pages/ConoceBelga/ConoceBelga.jsx";
import Emprendimientos from "./pages/Emprendimientos/Emprendimientos.jsx";
// import Favorites from "./pages/Favorites/Favorites.jsx";
import QuieroVender from "./pages/QuieroVender/QuieroVender.jsx";
// import TerminosYCondiciones from "./pages/Terminos/TerminosYCondiciones.jsx";
import Error404 from "./pages/404/404.jsx";
import Error500 from "./pages/500/500.jsx";
import { FiltersProvider } from './context/FiltersContext'; // Importar el contexto
import DevelopmentsDetail from "./components/DevelopmentsDetail/DevelopmentsDetail.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import Blog from "./pages/Blog/Blog.jsx";
import Layout from "./components/Layout/Layout.jsx";
import BlogDetail from "./pages/Blog/BlogDetail/BlogDetail.jsx";

function App() {
  return (
    <FiltersProvider>
    <Router>
      <Menu/>
      <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/propertylist" element={<ItemListContainer />} />
        <Route path="/propiedad/:propertyId" element={<ItemDetailContainer/>}/>
        <Route path="/404" element={<Error404 />} />
        <Route path="/500" element={<Error500 />} /> 
        <Route path="/quiero-vender" element={<QuieroVender />} />
        <Route path="/emprendimientos" element={<Emprendimientos />} />
        <Route path="/emprendimientos/:id" element={<DevelopmentsDetail />} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/blog" element={<Blog/>} />
        <Route path="/blog/:id" element={<BlogDetail />} />

        {/* Ruta catch-all para URLs no definidas */}
        <Route path="*" element={<Navigate to="/404" />} /> 
        <Route path="/conoce-belga" element={<ConoceBelga />} />

        {/* Rutas comentadas */}
        {/* <Route path="/busquedas-guardadas" element={<BusquedasGuardadas />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/terminos-y-condiciones" element={<TerminosYCondiciones />} />
        */}
      </Routes>
      </Layout>
      <Footer/>
    </Router>
    </FiltersProvider>
  );
}

export default App;

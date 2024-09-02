import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Layout from "./components/Layout/Layout.jsx";
import Menu from "./components/Menu/Menu.jsx";
import PropertyList from "./components/PropertyList/PropertyList.jsx"
// import BusquedasGuardadas from "./pages/BusquedasGuardadas/BusquedasGuardadas.jsx";
// import ConoceBelga from "./pages/ConoceBelga/ConoceBelga.jsx";
// import Emprendimientos from "./pages/Emprendimientos";
// import Favorites from "./pages/Favorites/Favorites.jsx";
// import QuieroVender from "./pages/QuieroVender/QuieroVender.jsx";
// import TerminosYCondiciones from "./pages/Terminos/TerminosYCondiciones.jsx";
// import Error404 from "./pages/404/404.jsx";
// import Error500 from "./pages/500/500.jsx";

function App() {
  return (
    <Router>
      <Menu/>

     

        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/propertylist" element={<PropertyList />} />
                    {/* Aquí puedes agregar más rutas */}
          {/* <Route path="/busquedas-guardadas" element={<BusquedasGuardadas />} />
          <Route path="/conoce-belga" element={<ConoceBelga />} />
          <Route path="/emprendimientos" element={<Emprendimientos />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/quiero-vender" element={<QuieroVender />} />
          <Route path="/terminos-y-condiciones" element={<TerminosYCondiciones />} />
          <Route path="/404" element={<Error404 />} />
          <Route path="/500" element={<Error500 />} /> */}
        </Routes>
    </Router>
  );
}

export default App;

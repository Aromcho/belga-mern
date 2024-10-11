import React from 'react';
import SideBar from './SideBar/SideBar';
import Navbar from './BlogAdmin/NavBar/NavBar';
import "./Admin.css";

const Admin = () => {
  return (
    <div className='admin-container d-flex mt-5'>
        <SideBar />
    </div>
  );
};

export default Admin;

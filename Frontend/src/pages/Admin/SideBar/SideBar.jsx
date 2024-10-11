import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import NavBar from '../BlogAdmin/NavBar/NavBar';
import UserManagement from '../UserManagement/UserManagement';
import './SideBar.css'; // Archivo CSS personalizado

const SideBar = () => {
  const [value, setValue] = useState(0); // Estado para controlar la pestaña activa

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
        style={{ flexGrow: 1 }} // Para que el contenido crezca adecuadamente al lado de las pestañas
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  };

  const a11yProps = (index) => {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  };

  return (
    <Box className="d-flex" >
      {/* Barra lateral */}
      <Box className="sidebar-container" sx={{ width: 250, bgcolor: '#f5f5f5', borderRight: 1, borderColor: 'divider' }}>
        <div className="user-section text-center p-4">
          <Avatar alt="Camila Fella" src="/static/images/avatar/1.jpg" className="mx-auto" />
          <Typography variant="h6">Camila Fella</Typography>
          <Typography variant="body2">Administrador</Typography>
        </div>

        {/* Pestañas verticales */}
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider', flexGrow: 1 }}
        >
          <Tab label={<span className="tab-text"><i className="bi bi-journal-text"></i> Blog de noticias</span>} {...a11yProps(0)} />
          <Tab label={<span className="tab-text"><i className="bi bi-people"></i> Usuarios</span>} {...a11yProps(1)} />
          <Tab label={<span className="tab-text"><i className="bi bi-send"></i> Envíos de mails</span>} {...a11yProps(2)} />
          <Tab label={<span className="tab-text"><i className="bi bi-file-earmark-text"></i> Posicionamiento</span>} {...a11yProps(3)} />
        </Tabs>
      </Box>

      {/* Contenido dinámico a la derecha */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <TabPanel value={value} index={0}>
          <NavBar /> {/* Aquí puedes agregar contenido dinámico */}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <UserManagement/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Typography variant="h6">Contenido de Envíos de mails</Typography>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Typography variant="h6">Contenido de Posicionamiento</Typography>
        </TabPanel>
      </Box>
    </Box>
  );
};

export default SideBar;

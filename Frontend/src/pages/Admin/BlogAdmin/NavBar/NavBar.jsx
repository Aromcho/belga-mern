import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ItemListBlogAdmin from '../ItemListBlogAdmin/ItemListBlogAdmin';

const Navbar = () => {
  const [value, setValue] = useState(1); // 'Publicaciones' como pestaña activa por defecto

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const a11yProps = (index) => ({
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  });

  return (
    <>
      <AppBar 
        position="static" 
        color="default" 
        elevation={0} 
        sx={{ backgroundColor: 'white', borderBottom: '2px solid #e0e0e0' }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="Admin Sections"
              textColor="inherit"
              indicatorColor="primary"
              TabIndicatorProps={{
                style: {
                  backgroundColor: '#F2A900', // Color dorado para el subrayado
                },
              }}
              sx={{
                '& .MuiTab-root': {
                  fontWeight: 'bold',
                  color: '#000', // Color negro para los títulos
                },
              }}
            >
              <Tab label="Titulares" {...a11yProps(0)} />
              <Tab label="Publicaciones" {...a11yProps(1)} />
              <Tab label="Tercer Item" {...a11yProps(2)} />
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Contenido dinámico según la pestaña seleccionada */}
      <Box sx={{ p: 3 }}>
        {value === 0 && (
          <Typography variant="h6">Contenido de Titulares</Typography>
        )}
        {value === 1 && (
          <ItemListBlogAdmin /> // Mostrar las "cards" cuando la pestaña de "Publicaciones" esté activa
        )}
        {value === 2 && (
          <Typography variant="h6">Contenido del Tercer Item</Typography>
        )}
      </Box>
    </>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { Slider, Typography, Box } from '@mui/material';
import { FaDollarSign } from 'react-icons/fa';
import './MultiRangeSlider.css';

const MultiRangeSlider = ({ min, max, step, onChange }) => {
  const [value, setValue] = useState([min, max]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onChange && onChange(newValue); // Callback para pasar los valores actualizados al padre
  };

  // Función para formatear los números con puntos
  const formatNumber = (num) => num.toLocaleString('es-ES'); 

  return (
    <Box className="multi-range-slider">
      <Typography className="price-text" gutterBottom>
        <FaDollarSign className="price-icon" /> Precio
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={min}
        max={max}
        step={step}
        sx={{
          color: '#F1B332',
          '& .MuiSlider-thumb': {
            backgroundColor: '#F1B332',
          },
          '& .MuiSlider-track': {
            backgroundColor: '#F1B332',
          },
          '& .MuiSlider-rail': {
            backgroundColor: '#ddd',
          },
        }}
        className="slider-custom"
      />
      <div className="price-input-wrapper">
        <input
          className="input--price w-25"
          type="text"
          value={formatNumber(value[0])} // Formatear con puntos
          readOnly
        />
        <div className="input-divider" />
        <input
          className="input--price w-25"
          type="text"
          value={formatNumber(value[1])} // Formatear con puntos
          readOnly
        />
      </div>
    </Box>
  );
};

export default MultiRangeSlider;

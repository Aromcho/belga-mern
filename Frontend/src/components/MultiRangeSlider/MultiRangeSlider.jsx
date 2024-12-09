import React, { useState, useEffect, useCallback } from 'react';
import { Slider, Typography, Box } from '@mui/material';
import { debounce } from 'lodash';
import './MultiRangeSlider.css';

const MultiRangeSlider = ({ min, max, step, defaultValue, onChange }) => {
  const [value, setValue] = useState(defaultValue || [min, max]);

  // Debounce para retrasar las solicitudes
  const debouncedOnChange = useCallback(
    debounce((newValue) => {
      onChange && onChange(newValue); // Ejecutar el callback del padre
    }, 300), // 300ms de espera antes de ejecutar
    [onChange]
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
    debouncedOnChange(newValue); // Llamar al debounce en lugar de onChange directo
  };

  useEffect(() => {
    // Actualizar el estado del slider si los valores predeterminados cambian
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  // Función para formatear los números con puntos
  const formatNumber = (num) => num.toLocaleString('es-ES'); 

  return (
    <Box className="multi-range-slider">
      <Typography className="price-text" gutterBottom>
        Precio
      </Typography>
      <div>
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
          <div className="input--price-conatiner">
            <input
              className="input--price w-75"
              type="text"
              value={`USD ${formatNumber(value[0])}`} // Formatear con puntos
              readOnly
            />
          </div>
          <div className="input-divider" />
          <div className="input--price-conatiner">
            <input
              className="input--price w-75"
              type="text"
              value={`USD+${formatNumber(value[1])}`} // Formatear con puntos
              readOnly
            />
          </div>
        </div>
      </div>
    </Box>
  );
};

export default MultiRangeSlider;

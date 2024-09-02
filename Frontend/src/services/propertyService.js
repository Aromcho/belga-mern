import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

export const getProperties = async (params) => {
  const { data } = await axios.get(`${API_BASE_URL}/properties`, { params });
  return data;
};

export const getPropertyById = async (id) => {
  const { data } = await axios.get(`${API_BASE_URL}/properties/${id}`);
  return data;
};

export const getPropertyTypes = () => {
  return [
    { key: "Todos", value: -1 },
    { key: "Casas", value: 3 },
    { key: "Departamentos", value: 2 },
    { key: "PH", value: 13 },
    { key: "Emprendimientos", value: 4 },
    { key: "Terrenos", value: 1 },
    { key: "Oficinas", value: 5 },
    { key: "Cocheras", value: 10 },
    { key: "Locales", value: 7 },
    { key: "Campos", value: 9 },
  ];
};

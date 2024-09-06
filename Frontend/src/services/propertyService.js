import axios from 'axios';

const API_BASE_URL = process.env.API_URI || 'http://localhost:8080/api';

const getProperties = async (params) => {
  const { data } = await axios.get(`${API_BASE_URL}/properties`, { params });
  return data;
};

const getPropertyById = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/properties/441591` 
  , {
    params: {
    key: "0ec754e9e60d69817226012d2d0aaf3f15583490"
          }},
  );
  console.log('Detalles de la propiedad:', data);
  return data;
};
const getPropertyTypes = () => {
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
export { getProperties, getPropertyById, getPropertyTypes };
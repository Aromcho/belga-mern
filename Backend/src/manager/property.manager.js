// src/managers/property.manager.js

import Manager from './Manager.js'; // Ajusta la ruta si es necesario
import Property from '../models/property.model.js';

const PropertyManager = new Manager(Property);

export default PropertyManager;
import Manager from './Manager.js'; // Reutilizar el Manager genérico
import propertyDetail from '../models/propertyDetails.model.js'; // Importar el modelo de PropertyDetail

// Extender el manager genérico para PropertyDetail
const PropertyDetailManager = new Manager(propertyDetail);

export default PropertyDetailManager;

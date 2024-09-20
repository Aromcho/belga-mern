import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

// Schema para los detalles de la sucursal (branch)
const branchSchema = new mongoose.Schema({
  address: String,
  alternative_phone: String,
  alternative_phone_area: String,
  alternative_phone_country_code: String,
  alternative_phone_extension: String,
  branch_type: String,
  contact_time: String,
  created_date: Date,
  display_name: String,
  email: String,
  geo_lat: Number,
  geo_long: Number,
  gm_location_type: String,
  id: { type: Number, index: true },
  is_default: Boolean,
  logo: String,
  name: { type: String, index: true },
  pdf_footer_text: String,
  phone: String,
  phone_area: String,
  phone_country_code: String,
  phone_extension: String,
  use_pdf_footer: Boolean,
});

// Schema para las operaciones de la propiedad
const operationSchema = new mongoose.Schema({
  operation_id: { type: Number, index: true },
  operation_type: { type: String, index: true }, // Tipo de operación indexado
  prices: [
    {
      currency: String,
      period: String,
      price: { type: Number, index: true }, // Precio indexado
    },
  ],
});

// Schema para las imágenes de la propiedad
const photoSchema = new mongoose.Schema({
  description: String,
  image: String,
  is_blueprint: Boolean,
  is_front_cover: Boolean,
  order: Number,
  original: String,
  thumb: String,
});

// Schema para los tags personalizados
const tagSchema = new mongoose.Schema({
  id: Number,
  name: { type: String, index: true }, // Nombre del tag indexado
  type: Number,
});

// Schema para los videos
const videoSchema = new mongoose.Schema({
  description: String,
  id: Number,
  order: Number,
  player_url: String,
  provider: String,
  provider_id: Number,
  title: String,
  url: String,
  video_id: String,
});

// Schema principal para PropertyDetails
const propertyDetailsSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true, index: true }, // ID indexado
  address: { type: String, text: true }, // Dirección con índice de texto
  age: Number,
  bathroom_amount: Number,
  branch: branchSchema,
  created_at: Date,
  custom1: String,
  custom_tags: [tagSchema],
  deleted_at: Date,
  depth_measure: String,
  description: { type: String, text: true }, // Descripción con índice de texto
  description_only: String,
  development: Object,
  development_excel_extra_data: String,
  disposition: String,
  expenses: Number,
  extra_attributes: Array,
  fake_address: String,
  files: Array,
  floors_amount: Number,
  footer: String,
  front_measure: String,
  geo_lat: { type: Number, index: true }, // Latitud indexada
  geo_long: { type: Number, index: true }, // Longitud indexada
  gm_location_type: String,
  has_temporary_rent: Boolean,
  is_denounced: Boolean,
  is_starred_on_web: Boolean,
  legally_checked: String,
  location: {
    divisions: { type: Array, index: true }, // Divisiones de ubicación indexadas
    full_location: { type: String, text: true }, // Ubicación completa con índice de texto
    name: { type: String, index: true }, // Nombre de ubicación indexado
    parent_division: String,
    short_location: String,
    state: String,
    weight: Number,
  },
  occupation: Array,
  operations: [operationSchema],
  orientation: String,
  parking_lot_amount: { type: Number, index: true }, // Cantidad de cocheras indexada
  photos: [photoSchema],
  producer: {
    cellphone: String,
    email: String,
    id: Number,
    name: { type: String, text: true }, // Nombre del productor con índice de texto
    phone: String,
    picture: String,
    position: String,
  },
  property_condition: { type: String, text: true }, // Condición de la propiedad con índice de texto
  public_url: String,
  publication_title: { type: String, text: true }, // Título de la publicación con índice de texto
  real_address: String,
  reference_code: String,
  rich_description: String,
  roofed_surface: String,
  room_amount: { type: Number, index: true }, // Cantidad de habitaciones indexada
  semiroofed_surface: String,
  situation: String,
  status: Number,
  suite_amount: { type: Number, index: true }, // Cantidad de suites indexada
  surface: String,
  surface_measurement: String,
  tags: [tagSchema],
  toilet_amount: Number,
  total_surface: { type: String, index: true }, // Superficie total indexada
  transaction_requirements: String,
  type: {
    code: String,
    id: Number,
    name: { type: String, text: true }, // Tipo de propiedad con índice de texto
  },
  unroofed_surface: String,
  videos: [videoSchema],
  web_price: Boolean,
  zonification: String,
}, { timestamps: true }); // timestamps añade createdAt y updatedAt automáticamente

// Añadir el plugin de paginación
propertyDetailsSchema.plugin(mongoosePaginate);

// Añadir más campos al índice de texto
propertyDetailsSchema.index({
  address: "text",
  "location.full_location": "text",
  "location.name": "text", // Nombre del barrio
  "type.name": "text", // Tipo de propiedad
  "producer.name": "text", // Nombre del productor
  property_condition: "text", // Condición de la propiedad
});

// Crear índices compuestos para mejorar consultas de filtrado
propertyDetailsSchema.index({
  "operations.operation_type": 1,
  "type.name": 1,
  "operations.prices.price": 1,
  "room_amount": 1
});

const propertyDetail = mongoose.model('PropertyDetails', propertyDetailsSchema);

export default propertyDetail;

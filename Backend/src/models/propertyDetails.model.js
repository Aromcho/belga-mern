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
  id: Number,
  is_default: Boolean,
  logo: String,
  name: String,
  pdf_footer_text: String,
  phone: String,
  phone_area: String,
  phone_country_code: String,
  phone_extension: String,
  use_pdf_footer: Boolean,
});

// Schema para las operaciones de la propiedad
const operationSchema = new mongoose.Schema({
  operation_id: Number,
  operation_type: String,
  prices: [
    {
      currency: String,
      period: String,
      price: Number,
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
  name: String,
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
  id: { type: Number, required: true, unique: true }, // ID de la propiedad de Tokko
  address: String,
  age: Number,
  bathroom_amount: Number,
  branch: branchSchema,
  created_at: Date,
  custom1: String,
  custom_tags: [tagSchema],
  deleted_at: Date,
  depth_measure: String,
  description: String,
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
  geo_lat: Number,
  geo_long: Number,
  gm_location_type: String,
  has_temporary_rent: Boolean,
  is_denounced: Boolean,
  is_starred_on_web: Boolean,
  legally_checked: String,
  location: {
    divisions: Array,
    full_location: String,
    id: Number,
    name: String,
    parent_division: String,
    short_location: String,
    state: String,
    weight: Number,
  },
  occupation: Array,
  operations: [operationSchema],
  orientation: String,
  parking_lot_amount: Number,
  photos: [photoSchema],
  producer: {
    cellphone: String,
    email: String,
    id: Number,
    name: String,
    phone: String,
    picture: String,
    position: String,
  },
  property_condition: String,
  public_url: String,
  publication_title: String,
  real_address: String,
  reference_code: String,
  rich_description: String,
  roofed_surface: String,
  room_amount: Number,
  semiroofed_surface: String,
  situation: String,
  status: Number,
  suite_amount: Number,
  surface: String,
  surface_measurement: String,
  tags: [tagSchema],
  toilet_amount: Number,
  total_surface: String,
  transaction_requirements: String,
  type: {
    code: String,
    id: Number,
    name: String,
  },
  unroofed_surface: String,
  videos: [videoSchema],
  web_price: Boolean,
  zonification: String,
}, { timestamps: true }); // timestamps añade createdAt y updatedAt automáticamente

propertyDetailsSchema.plugin(mongoosePaginate);

const propertyDetail = mongoose.model('PropertyDetails', propertyDetailsSchema);
export default propertyDetail;
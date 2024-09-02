import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

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

const propertySchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    index: true,
  },
  title: String,
  price: Number,
  description: String,
  photos: [
    {
      url: String,
      description: String,
      is_blueprint: Boolean,
    },
  ],
  location: {
    address: String,
    city: String,
    state: String,
    country: String,
    geo_lat: Number,
    geo_long: Number,
    divisions: [
      {
        id: Number,
        name: String,
        resource_uri: String,
      },
    ],
  },
  branch: branchSchema,
  operations: [
    {
      operation_type: String,
      prices: [
        {
          currency: String,
          period: String,
          price: Number,
        },
      ],
    },
  ],
  custom_tags: [
    {
      id: Number,
      name: String,
    },
  ],
  status: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  deleted_at: Date,
});

propertySchema.plugin(mongoosePaginate);

const Property = mongoose.model('Property', propertySchema);

export default Property;

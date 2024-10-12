import  { Schema, model } from 'mongoose';

const collection = 'articules';
const schema = new Schema({

    title: { type: String, require: true, unique: true, index: true },
    subtitle: { type: String, require: true },
    description: { type: String, require: true },
    photo: { type: String, require: true },
    category: { type: String, require: true },
}, {
    timestamps: true
});

const Articule = model(collection, schema);
export default Articule;
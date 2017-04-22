/**
 * Created by andh on 1/29/17.
 */
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
// var random = require('mongoose-simple-random');
const CategorySchema = new Schema({
  _id: {
    type: String,
    trim: true,
    unique: true,
    match: [/^[A-Za-z-]{3,20}$/, "Please fill a valid category's url"],
    required: 'Url of category is required',
  },
  title: {
    type: String,
    trim: true,
    required: 'Cần title',
    maxlength: 36,
  },
  thumb: {
    type: String,
    trim: true,
    required: 'Cần thumb',
  },
});
// GameSchema.plugin(random);
CategorySchema.set('toJSON', { getters: true, virtuals: true });
export default mongoose.model('Category', CategorySchema);

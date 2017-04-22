/**
 * Created by andh on 1/29/17.
 */
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import autoIncrement from 'mongoose-auto-increment';
import serverConfig from '../configs/server.config.js';
const connection = mongoose.createConnection(serverConfig.mongoURL);
autoIncrement.initialize(connection);
// var random = require('mongoose-simple-random');
const GameSchema = new Schema({
  slug: {
    type: String,
    trim: true,
    require: 'Need Slug',
  },
  title: {
    type: String,
    trim: true,
    required: 'Cấn tiêu đề',
    maxlength: 80,
  },
  des: {
    type: String,
    trim: true,
    maxlength: 200,
  },
  topic: {
    type: Number,
    ref: 'Topic',
    require: 'Require topics',
  },
  created: {
    type: Date,
    default: Date.now,
  },
  playsCount: {
    type: Number,
    default: 0,
  },
  sharesCount: {
    type: Number,
    default: 0,
  },
  viewsCount: {
    type: Number,
    default: 0,
  },
  adsImage: {
    type: String,
    require: 'Require ads image',
  },
  link: {
    type: String,
    require: 'Require link',
  },
  thumbImage: {
    type: String,
    require: 'Require thumbImage',
  },
  results: [{
    image: String,
    title: String,
    des: String,
    score: Number,
  }],
  color: {
    type: String,
    require: 'Require color',
  },
  publish: {
    type: Boolean,
    default: true,
  },
});
GameSchema.plugin(autoIncrement.plugin, {
  model: 'Game',
  startAt: 1,
});
// ContentSchema.statics.findChallengeByURL = function(url, callback) {
//     this.findOne({
//             url: url
//         }).populate('creator', 'displayName username avatar')
//         .populate('categories', 'title')
//         .populate('types', 'title')
//         .exec(callback);
// };
// GameSchema.plugin(random);
GameSchema.index({ title: 'text', description: 'text' });
GameSchema.set('toJSON', { getters: true, virtuals: true });
export default mongoose.model('Game', GameSchema);

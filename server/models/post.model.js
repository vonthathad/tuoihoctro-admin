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
const PostSchema = new Schema({
  title: {
    type: String,
    trim: true,
    // required: 'Cấn tiêu đề',
    maxlength: 100,
  },
  slug: {
    type: String,
    trim: true,
    // required: 'Cấn tiêu đề',
    maxlength: 200,
  },
  mh: {
    type: Number,
    default: 0,
  },
  th: {
    type: Number,
    default: 0,
    // required: 'Cấn chiều dài thumb',
  },
  cate: {
    type: Number,
    // required: 'Cần category',
  },
  shares: [{
    type: Number,
    default: [],
  }],
  view: {
    type: Number,
    default: 0,
  },
  reports: [{
    type: String,
    default: [],
  }],
  votes: [{
    type: Number,
    default: [],
  }],
  created: {
    type: Date,
    default: Date.now,
  },
  point: {
    type: Number,
    default: 1,
  },
  creator: {
    type: Number,
  },
  type: {
    type: Number,
    // required: 'Cần type',
  },
  publish: {
    type: Boolean,
    default: true,
  },
  processed: {
    type: Boolean,
    default: false,
  },
});
PostSchema.plugin(autoIncrement.plugin, {
  model: 'Post',
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
PostSchema.index({ title: 'text', description: 'text' });
PostSchema.set('toJSON', { getters: true, virtuals: true });
export default mongoose.model('Post', PostSchema);

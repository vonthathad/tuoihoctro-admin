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
    required: 'Cấn tiêu đề',
    maxlength: 80,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 200,
  },

  mediaContent: {
    type: String,
    trim: true,
    required: 'Cần nội dung số',
  },
  mediaContentLQ: {
    type: String,
    trim: true,
  },
  mediaContentHeight: {
    type: Number,
    default: 0,
  },
  mediaContentWidth: {
    type: Number,
    default: 0,
  },

  thumb: {
    type: String,
    trim: true,
    required: 'Cần thumb',
  },
  thumbLQ: {
    type: String,
    trim: true,
  },
  thumbHeight: {
    type: Number,
    default: 0,
  },
  thumbWidth: {
    type: Number,
    default: 0,
  },

  smallThumb: {
    type: String,
    trim: true,
    required: 'Cần smallthumb',
  },
  smallThumbLQ: {
    type: String,
    trim: true,
    required: 'Cần smallthumb',
  },
  smallThumbHeight: {
    type: Number,
    default: 0,
  },
  smallThumbWidth: {
    type: Number,
    default: 0,
  },
  categories: [{
    type: String,
    required: 'Cần thể loại',
    ref: 'Category',
  }],
  shares: [{
    type: Number,
    ref: 'User',
    default: [],
  }],
  view: {
    type: Number,
    default: 0,
  },
  reports: [{
    type: Number,
    ref: 'User',
    default: [],
  }],
  votes: [{
    type: Number,
    ref: 'User',
    default: [],
  }],
  // voteUps: [{
  //   type: Number,
  //   ref: 'User',
  //   default: [],
  // }],
  // voteDowns: [{
  //   type: Number,
  //   ref: 'User',
  //   default: [],
  // }],
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
    ref: 'User',
    required: 'Cần người tạo',
  },
  type: {
    type: String,
    required: 'Cần type',
  },
  numComment: {
    type: Number,
    default: 0,
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

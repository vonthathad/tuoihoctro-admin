/**
 * Created by andh on 1/29/17.
 */
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
// const ObjectId = mongoose.Types.ObjectId;
// const config = require('../configs/config.js');
// const connection = mongoose.createConnection(config.database);
const CommentSchema = new Schema({
  content: {
    type: Number,
    ref: 'Content',
    required: 'Content cannot be blank',
  },
  comment: {
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  },
  created: {
    type: Date,
    default: Date.now,
  },
  modified: {
    type: Date,
  },
  message: {
    type: String,
    required: 'messange không được rỗng',
    trim: true,
    maxlength: 140,
  },
  creator: {
    type: Number,
    ref: 'User',
  },
  voteUps: [{
    type: Number,
    ref: 'User',
    default: [],
  }],
  voteDowns: [{
    type: Number,
    ref: 'User',
    default: [],
  }],
  pointUp: {
    type: Number,
    default: 0,
  },
  pointDown: {
    type: Number,
    default: 0,
  },
  pointTotal: {
    type: Number,
    default: 0,
  },
});
export default mongoose.model('Comment', CommentSchema);

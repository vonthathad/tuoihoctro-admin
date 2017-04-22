/**
 * Created by andh on 1/29/17.
 */
import Content from '../models/post.model';
import Comment from '../models/comment.model';
const npp = 10;
const getErrorMessage = (err) => {
  // console.log(err);
  let messages = [];
  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        messages = ['ID is exist'];
        break;
      default: break;
    }
  } else {
    for (const errName of err.errors) {
      if (err.errors[errName].message) messages.push(err.errors[errName].message);
    }
  }
  return messages;
};
exports.hasAuthorization = (req, res, next) => {
  if (req.comment.creator._id !== parseInt(req.user._id, 10) && req.user.role !== 'admin' && req.user.role !== 'manager') {
    return res.status(403).send({
      messages: ["You aren't Creator"],
    });
  }
  next();
  return null;
};
exports.list = (req, res) => {
  console.log(req.query);
  const paging = parseInt(req.query.paging, 10) || npp;
  const page = parseInt(req.query.page, 10) || 1;
  const skip = page > 0 ? ((page - 1) * paging) : 0;
  // console.log(req.query.content);
  if (req.query.content) {
    Comment.aggregate(
      [
                { $match: { content: parseInt(req.query.content, 10) } },
        {
          $lookup: {
            from: 'users',
            localField: 'creator',
            foreignField: '_id',
            as: 'creator',
          },
        },
        {
          $project: {
                        // p: { $divide: ["$pointUp", "$pointTotal"] },
                        // left: {
                        //     $add: [
                        //         { $divide: ["$pointUp", "$pointTotal"] },
                        //         {
                        //             $divide: [1.64237441515, {
                        //                 $multiply: ["$pointTotal", 2]
                        //             }]
                        //         }]
                        // },
                        // right: {
                        //     $add: [
                        //         {
                        //             $divide: [
                        //                 {
                        //                     $multiply: [1.281551565545, {
                        //                         $sqrt: {
                        //                             $multiply: [{ $divide: ["$pointUp", "$pointTotal"] },
                        //                             { $subtract: [1, { $divide: ["$pointUp", "$pointTotal"] }] }]
                        //                         }
                        //                     }]
                        //                 },
                        //                 { $add: ["$pointUp", "$pointDown"] }
                        //             ]
                        //         },
                        //         {
                        //             $divide: [
                        //                 1.64237441515,
                        //                 {
                        //                     $multiply: [
                        //                         { $multiply: ["$pointTotal", "$pointTotal"] },
                        //                         4
                        //                     ]
                        //                 }
                        //             ]
                        //         }
                        //     ]
                        // },
                        // under: {
                        //     $add: [
                        //         1,
                        //         {
                        //             $divide: [
                        //                 1,
                        //                 {
                        //                     $multiply: [1.64237441515, "$pointTotal"]
                        //                 }
                        //             ]
                        //         }
                        //     ]
                        // },
            confident: {
              $cond: [{ $eq: ['$pointTotal', 0] },
                                0, {
                                  $divide: [
                                    {
                                      $subtract: [
                                        {
                                          $add: [
                                                    { $divide: ['$pointUp', '$pointTotal'] },
                                            {
                                              $divide: [1.64237441515, {
                                                $multiply: ['$pointTotal', 2],
                                              }],
                                            }],
                                        },
                                        {
                                          $add: [
                                            {
                                              $divide: [
                                                {
                                                  $multiply: [1.281551565545, {
                                                    $sqrt: {
                                                      $multiply: [{ $divide: ['$pointUp', '$pointTotal'] },
                                                                        { $subtract: [1, { $divide: ['$pointUp', '$pointTotal'] }] }],
                                                    },
                                                  }],
                                                },
                                                            { $add: ['$pointUp', '$pointDown'] },
                                              ],
                                            },
                                            {
                                              $divide: [
                                                1.64237441515,
                                                {
                                                  $multiply: [
                                                                    { $multiply: ['$pointTotal', '$pointTotal'] },
                                                    4,
                                                  ],
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                    {
                                      $add: [
                                        1,
                                        {
                                          $divide: [
                                            1,
                                            {
                                              $multiply: [1.64237441515, '$pointTotal'],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                }],
            },
            content: 1,
            comment: 1,
            created: 1,
            message: 1,
            pointUp: 1,
            pointDown: 1,
            pointTotal: 1,
            voteUps: 1,
            creator: {
              $arrayElemAt: [[{
                avatar: { $arrayElemAt: ['$creator.avatar', 0] },
                username: { $arrayElemAt: ['$creator.username', 0] },
              }], 0],
            },
          },
        },
                { $sort: { confident: -1 } },
                { $skip: skip },
                // Optionally limit results
                { $limit: (paging) },
      ]
            , (err, results) => {
      if (err) return res.status(400).send();
      return res.json(results);
    }
        );
        // Comment.find({ content: req.query.content }, '-voteUps -voteDowns')
        //     .sort('-created')
        //     .limit(paging + 1)
        //     .populate('creator', 'avatar displayName username')
        //     .skip(skip)
        //     .exec(function (err, comments) {
        //         if (err) return res.status(400).send();
        //         var isNext = false;
        //         if (comments.length == (paging + 1)) {
        //             isNext = true;
        //             comments.pop();
        //         };
        //         resdata = {
        //             data: comments,
        //             isNext: isNext
        //         };
        //         return res.json(resdata);
        //     });
  } else {
    return res.status(400).send({
      messages: ['Must have a content'],
    });
  }
  return null;
};
exports.create = (req, res) => {
  req.body.creator = req.user._id;
  if (req.body.content) {
    const comment = new Comment(req.body);
    comment.save((err, comment2) => {
      if (err) return res.status(400).send({ messages: getErrorMessage(err) });
      Content.findByIdAndUpdate(req.body.content, { $inc: { numComment: 1 } }).exec((err1, success) => {
        if (err1) return res.status(400).send();
        if (success) {
          Comment.findById(comment2._id).populate('creator', 'displayName avatar username')
                        .exec((err2, data) => {
                          if (err2) return res.status(400).send({ messages: getErrorMessage(err2) });
                            // increase numComment of Content
                          // console.log(success);
                          return res.json({ data });
                        });
        } else {
          return res.json({ message: 'Không tìm thấy comment' });
        }
        return null;
      });
      return null;
    });
  } else if (req.body.comment) {
    Comment.findById(req.body.comment, (err, data) => {
      if (err || !data || !data.content) return res.status(400).send();
      req.body.content = data.content;
      const comment = new Comment(req.body);
      comment.save((err1, comment1) => {
        const tmp = {
          content: comment1.content,
          created: comment1.created,
          creator: {
            _id: req.user._id,
            avatar: req.user.avatar,
            displayName: req.user.displayName,
            username: req.user.username,
          },
        };
        if (err) return res.status(400).send({ messages: getErrorMessage(err) });
        return res.json({ data: tmp });
      });
      return null;
    });
  } else {
    return res.status(400).send({
      messages: ['Must have a content or comment'],
    });
  }
  return null;
};
exports.update = (req, res) => {
  Comment.findByIdAndUpdate(req.comment._id, {
    message: req.body.message,
    modified: Date.now(),
  }, (err) => {
    if (err) return res.status(400).send({ messages: getErrorMessage(err) });
    return res.json({ message: "Comment's information has changed" });
  });
};
exports.remove = (req, res) => {
  req.comment.remove((err, comment) => {
    if (err) return res.status(400).send({ messages: getErrorMessage(err) });
    return res.json({ data: comment });
  });
};


// /

exports.voteUp = (req, res) => {
  let isVotedUp = false;
  req.comment.voteUps.forEach((vote) => {
    if (vote === req.user._id) isVotedUp = true;
    return null;
  });

  if (!isVotedUp) {
    let isVotedDown = false;
    req.comment.voteDowns.forEach((vote) => {
      if (vote === req.user._id) isVotedDown = true;
      return null;
    });
    if (isVotedDown) {
      Comment.findByIdAndUpdate(req.comment._id, { $pull: { voteDowns: req.user._id }, $inc: { pointDown: -1 } }).exec((err) => {
        if (err) return res.status(400).send();
        Comment.findByIdAndUpdate(req.comment._id, { $addToSet: { voteUps: req.user._id }, $inc: { pointUp: +1 } }).exec((err1) => {
          if (err1) return res.status(400).send();
          return res.status(200).send({ data: { voteUp: true } });
        });
        return null;
      });
    } else {
      Comment.findByIdAndUpdate(req.comment._id, { $addToSet: { voteUps: req.user._id }, $inc: { pointUp: +1, pointTotal: +1 } }).exec((err) => {
        if (err) return res.status(400).send();
        return res.status(200).send({ data: { voteUp: true } });
      });
      return null;
    }
  } else {
    return res.status(200).send({ data: { voteUp: false } });
  }
  return null;
};

exports.voteDown = (req, res) => {
  let isVotedDown = false;
  req.comment.voteDowns.forEach((vote) => {
    if (vote === req.user._id) isVotedDown = true;
    return null;
  });

  if (!isVotedDown) {
    let isVotedUp = false;
    req.comment.voteUps.forEach((vote) => {
      if (vote === req.user._id) isVotedUp = true;
      return null;
    });
    if (isVotedUp) {
      Comment.findByIdAndUpdate(req.comment._id, { $pull: { voteUps: req.user._id }, $inc: { pointUp: -1 } }).exec((err) => {
        if (err) return res.status(400).send();
        Comment.findByIdAndUpdate(req.comment._id, { $addToSet: { voteDowns: req.user._id }, $inc: { pointDown: +1 } }).exec((err1) => {
          if (err1) return res.status(400).send();
          return res.status(200).send({ data: { voteDown: true } });
        });
        return null;
      });
    } else {
      Comment.findByIdAndUpdate(req.comment._id, { $addToSet: { voteDowns: req.user._id }, $inc: { pointDown: +1, pointTotal: +1 } }).exec((err) => {
        if (err) return res.status(400).send();
        return res.status(200).send({ data: { voteDown: true } });
      });
    }
  } else {
    return res.status(200).send({ data: { voteDown: false } });
  }
  return null;
};


exports.unVote = (req, res) => {
    // remove vote up
  let isVotedUp = false;
  req.comment.voteUps.forEach((vote) => {
    if (vote === req.user._id) isVotedUp = true;
    return null;
  });

    // remove vote down
  let isVotedDown = false;
  req.comment.voteDowns.forEach((vote) => {
    if (vote === req.user._id) isVotedDown = true;
    return null;
  });
  if (isVotedDown) {
    Comment.findByIdAndUpdate(req.comment._id, { $pull: { voteDowns: req.user._id }, $inc: { pointDown: -1, pointTotal: -1 } }).exec((err) => {
      if (err) return res.status(400).send();
      if (isVotedUp) {
        Comment.findByIdAndUpdate(req.comment._id, { $pull: { voteUps: req.user._id }, $inc: { pointUp: -1, pointTotal: -1 } }).exec((err1) => {
          if (err1) return res.status(400).send();
          return res.status(200).send({ data: { unVote: true } });
        });
      } else {
        return res.status(200).send({ data: { unVote: true } });
      }
      return null;
    });
  } else {
    if (isVotedUp) {
      Comment.findByIdAndUpdate(req.comment._id, { $pull: { voteUps: req.user._id }, $inc: { pointUp: -1, pointTotal: -1 } }).exec((err) => {
        if (err) return res.status(400).send();
        return res.status(200).send({ data: { unVote: true } });
      });
    } else {
      return res.status(200).send({ data: { unVote: false } });
    }
  }
  return null;
};


exports.commentByID = (req, res, next, id) => {
  Comment.findById(id)
        .exec((err, comment) => {
          if (err) {
            return res.status(400).send();
          }
          if (!comment) {
            return res.status(400).send({ messages: [`Failed to load comment ${id}`] });
          }
          req.comment = comment;
          next();
          return null;
        });
};

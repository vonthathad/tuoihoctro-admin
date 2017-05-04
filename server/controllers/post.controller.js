/**
 * Created by andh on 1/29/17.
 */
import Post from '../models/post.model';
const npp = 6;
import fs from 'fs-extra';
import ffmpeg from 'fluent-ffmpeg';
import childProcess from 'child_process';

const storeDir = `${__dirname}/../../../tuoihoctro.co/public/posts_data/`;

exports.hasAuthorization = (req, res, next) => {
  if (req.post.creator._id !== parseInt(req.user._id, 10) && req.user.role !== 'admin' && req.user.role !== 'manager') {
    return res
      .status(403)
      .send({ messages: ["You aren't Creator"] });
  }
  next();
  return null;
};
exports.listPosts = (req, res) => {
  const paging = parseInt(req.query.paging, 10) || npp;
  // console.log('paging', paging);
  const page = parseInt(req.query.page, 10) || 1;
  const skip = page > 0 ? ((page - 1) * paging) : 0;
  const conds = [];
  if (!req.query.user || parseInt(req.query.user, 10) !== req.user._id) {
    if (req.query.review) {
      conds.push({ review: true });
    } else {
      conds.push({ publish: true });
    }
  }
  req.query.category && conds.push({ categories: req.query.category });
  if (req.query.recommendations && req.user._id) {
    if (req.user.recommendations) {
      const cateList = [];
      req.user.recommendations.forEach((recommendation) => {
        cateList.push({ categories: recommendation });
      });
      if (cateList.length) {
        conds.push({ $or: cateList });
      }
    }
  }
  req.query.user && conds.push({ creator: parseInt(req.query.user, 10) });
  req.query.text && conds.push({
    $or: [
      { title: { $regex: req.query.text, $options: 'i' } },
      { description: { $regex: req.query.text, $options: 'i' } },
    ],
  });
  conds.push({ processed: true });
  let match = null;
  if (!conds.length) match = {};
  else if (conds.length === 1) match = conds.pop();
  else match = { $and: conds };
  // https://medium.com/hacking-and-gonzo/how-reddit-ranking-algorithms-work-ef111
  // e33d0d9#.hkka5wx3i
  const project = {
    title: 1, type: 1, categories: 1,
    mediaContent: 1, mediaContentLQ: 1, mediaContentHeight: 1, mediaContentWidth: 1,
    thumb: 1, thumbLQ: 1, thumbHeight: 1, thumbWidth: 1,
    mh:1,
    smallThumb: 1, smallThumbLQ: 1, smallThumbHeight: 1, smallThumbWidth: 1,
    created: 1, description: 1, shares: 1, follows: 1, view: 1, votes: 1, point: 1, creator: 1,
  };
  Post.aggregate([
    { $match: match },
    { $project: project },
    { $sort: { created: -1 } },
    { $skip: skip },
    { $limit: paging },
  ], (err, results) => {
    if (err) return res.status(400).send();
    if (results.length === 0) return res.status(404).send();
    return res.json({ data: results });
  });
  return null;
};

const checkExist = (path) => {
  return new Promise((resolve) => {
    fs.exists(path, (exists) => {
      resolve(exists);
    });
  });
};
function writeFileFromByte64(path, base64Data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, base64Data, 'base64', err => {
      if (err) { reject({ code: 500, err }); return; }
      resolve();
    });
  });
}
function findLatestPost() {
  return new Promise((resolve, reject) => {
    Post.findOne({}, {}, { sort: { _id: -1 } }, (err, latestPost) => {
      if (err) { reject({ code: 500, err }); return; }
      // if (!latestPost) { reject({ code: 404, err }); return; }
      resolve(latestPost);
    });
  });
}
function cloneResize15(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    childProcess.exec(`convert ${inputPath} -resize 15%  ${outputPath}`, err => {
      if (err) { reject({ code: 500, err }); return; }
      resolve();
    });
  });
}

const compressJPG = (inputPath) => {
  return new Promise((resolve, reject) => {
    childProcess.exec(`jpegoptim --max=55 -s ${inputPath} `, (err) => {
      if (err) { reject({ code: 500, err }); return; }
      resolve();
    });
  });
};
const optiMp4 = (inputPath) => {
  return new Promise((resolve, reject) => {
    childProcess.exec(`ffmpeg -i ${inputPath} -movflags faststart -acodec copy -vcodec copy ${inputPath} -y `, (err) => {
      if (err) { reject({ code: 500, err }); return; }
      resolve();
    });
  });
};
const createFolder = (path) => {
  return new Promise((resolve, reject) => {
    childProcess.exec(`mkdir ${path} `, (err) => {
      if (err) { reject({ code: 500, err }); return; }
      resolve();
    });
  });
};
const getImgHeight = (path) => {
  return new Promise((resolve, reject) => {
    childProcess.exec(`identify -format "%[fx:h]"  ${path} `, (err, stdout) => {
      if (err) { reject({ code: 500, err }); return; }
      resolve(stdout);
    });
  });
};
const resizeMp4 = (path) => {
  return new Promise((resolve, reject) => {
    const tempPath = `${path.split('.mp4')[0]}x.mp4`;
    childProcess.exec(`ffmpeg -i ${path} -vf scale=600:-1 ${tempPath} -y && mv ${tempPath} ${path}`, (err, stdout) => {
      if (err) { reject({ code: 500, err }); return; }
      resolve(stdout);
    });
  });
};
const addWM2Img = (path, WMPath) => {
  return new Promise((resolve, reject) => {
    childProcess.exec(`composite -gravity south ${WMPath} ${path} ${path}`, (err, stdout) => {
      if (err) { reject({ code: 500, err }); return; }
      resolve(stdout);
    });
  });
};
const addWM2Mp4 = (path, WMPath) => {
  return new Promise((resolve, reject) => {
    const tempPath = `${path.split('.mp4')[0]}x.mp4`;
    childProcess.exec(`ffmpeg -i ${path} -i ${WMPath} -filter_complex "overlay=main_w/2-overlay_w/2:main_h-overlay_h" ${tempPath} -y && mv ${tempPath} ${path}`, (err, stdout) => {
      if (err) { reject({ code: 500, err }); return; }
      resolve(stdout);
    });
  });
};

const removeF = (path) => {
  return new Promise((resolve, reject) => {
    fs.remove(path, err => {
      err && reject({ code: 500, err });
      resolve();
    });
  });
};

const addPost = (data) => {
  return new Promise((resolve, reject) => {
    (new Post(data)).save((err, addedPost) => {
      err && reject({ code: 500, err });
      resolve(addedPost);
    });
  });
};
const updatePostById = (data) => {
  return new Promise((resolve, reject) => {
    Post.findByIdAndUpdate(data._id, data, (err, addedPost) => {
      err && reject({ code: 500, err });
      resolve(addedPost);
    });
  });
};
function requestOK(res, data) {
  return new Promise((resolve) => {
    res.status(200).send({ message: 'OK', data });
    resolve();
  });
}
exports.create = async (req, res) => {
  const post = req.body;
  // const baseUrl = 'http://localhost:4000/';
  const latestPost = await findLatestPost();
  const newId = latestPost ? latestPost._id + 1 : 0;
  await addPost({ _id: newId, title: 'f' });
  const basePath = `${storeDir}${newId}/`;
  await removeF(basePath);

  try {
    await createFolder(basePath);
    const isGif = post.type === 1;
    const media64 = post.mediaSrc.replace(/^data:(video|image)\/(jpeg|mp4);base64,/, '');
    const mediaPath = `${basePath}${newId}_m.${isGif ? 'mp4' : 'jpeg'}`;
    const mediaWMPath = `${basePath}../_wm/wm_m.png`;
    await writeFileFromByte64(mediaPath, media64);
    if (!isGif) {
      const mediaResizePath = `${basePath}${newId}_mr.jpeg`;
      await addWM2Img(mediaPath, mediaWMPath);
      await cloneResize15(mediaPath, mediaResizePath);
      await compressJPG(mediaPath);
      await compressJPG(mediaResizePath);
    } else {
      // await optiMp4(mediaPath);
      await resizeMp4(mediaPath);
      await addWM2Mp4(mediaPath, mediaWMPath);
    }
    const mh = !isGif ? await getImgHeight(mediaPath) : 0;

    let th = 0;
    if (post.thumbSrc && post.thumbSrc !== 'empty') {
      const thumb64 = post.thumbSrc.replace(/^data:image\/jpeg;base64,/, '');
      const thumbPath = `${basePath}${newId}_t.jpeg`;
      const thumbWMPath = `${basePath}../_wm/wm_t.png`;
      const thumbResizePath = `${basePath}${newId}_tr.jpeg`;
      await writeFileFromByte64(thumbPath, thumb64);
      await addWM2Img(thumbPath, thumbWMPath);
      await cloneResize15(thumbPath, thumbResizePath);
      await compressJPG(thumbPath);
      await compressJPG(thumbResizePath);
      th = await getImgHeight(thumbPath);
    }

    if (post.recommendSrc && post.recommendSrc !== 'empty') {
      const recommend64 = post.recommendSrc.replace(/^data:image\/jpeg;base64,/, '');
      const recommendPath = `${basePath}${newId}_r.jpeg`;
      const recommendWMPath = `${basePath}../_wm/wm_r.png`;
      const recommendResizePath = `${basePath}${newId}_rr.jpeg`;
      await writeFileFromByte64(recommendPath, recommend64);
      await addWM2Img(recommendPath, recommendWMPath);
      await cloneResize15(recommendPath, recommendResizePath);
      await compressJPG(recommendPath);
      await compressJPG(recommendResizePath);
    }

    const data = { th, mh, title: post.title, cate: post.cate, type: post.type, _id: newId, processed: true, publish: post.publish };
    await updatePostById(data);
    await requestOK(res, data);
  } catch (message) {
    console.log(message);
    return res.status(message.code).send();
  }
  return null;
};
exports.update = async (req, res) => {
  const post = req.body;
  // console.log(post);
  // const baseUrl = 'http://localhost:4000/';
  const currentId = post._id;
  const basePath = `${storeDir}${currentId}/`;
  try {
    !(await checkExist(basePath)) && await createFolder(basePath);
    const isGif = post.type === 1;
    let mh = post.mh;
    if (post.mediaSrc) {
      const media64 = post.mediaSrc.replace(/^data:(video|image)\/(jpeg|mp4);base64,/, '');
      const mediaPath = `${basePath}${currentId}_m.${isGif ? 'mp4' : 'jpeg'}`;
      const mediaWMPath = `${basePath}../_wm/wm_m.png`;
      await removeF(`${basePath}${currentId}_m.mp4`);
      await removeF(`${basePath}${currentId}_m.jpeg`);
      await writeFileFromByte64(mediaPath, media64);
      if (!isGif) {
        const mediaResizePath = `${basePath}${currentId}_mr.jpeg`;
        await addWM2Img(mediaPath, mediaWMPath);
        await cloneResize15(mediaPath, mediaResizePath);
        await compressJPG(mediaPath);
        await compressJPG(mediaResizePath);
      } else {
        // await optiMp4(mediaPath);
        await resizeMp4(mediaPath);
        await addWM2Mp4(mediaPath, mediaWMPath);
      }
      mh = !isGif ? await getImgHeight(mediaPath) : 0;
    }

    let th = post.th;
    if (post.thumbSrc && post.thumbSrc !== 'empty') {
      const thumb64 = post.thumbSrc.replace(/^data:image\/jpeg;base64,/, '');
      const thumbPath = `${basePath}${currentId}_t.jpeg`;
      const thumbWMPath = `${basePath}../_wm/wm_t.png`;
      const thumbResizePath = `${basePath}${currentId}_tr.jpeg`;
      await removeF(thumbPath);
      await writeFileFromByte64(thumbPath, thumb64);
      await addWM2Img(thumbPath, thumbWMPath);
      await cloneResize15(thumbPath, thumbResizePath);
      await compressJPG(thumbPath);
      await compressJPG(thumbResizePath);
      th = await getImgHeight(thumbPath);
    }

    if (post.recommendSrc && post.recommendSrc !== 'empty') {
      const recommend64 = post.recommendSrc.replace(/^data:image\/jpeg;base64,/, '');
      const recommendPath = `${basePath}${currentId}_r.jpeg`;
      const recommendWMPath = `${basePath}../_wm/wm_r.png`;
      const recommendResizePath = `${basePath}${currentId}_rr.jpeg`;
      await removeF(recommendPath);
      await writeFileFromByte64(recommendPath, recommend64);
      await addWM2Img(recommendPath, recommendWMPath);
      await cloneResize15(recommendPath, recommendResizePath);
      await compressJPG(recommendPath);
      await compressJPG(recommendResizePath);
    }

    const data = { th, mh, title: post.title, cate: post.cate, type: post.type, _id: currentId, processed: true, publish: post.publish };
    await updatePostById(data);
    await requestOK(res, data);
  } catch (message) {
    console.log(message);
    return res.status(message.code).send();
  }
  return null;
};
function removePost(post) {
  return new Promise((resolve, reject) => {
    post.remove((err, deletedPost) => {
      if (err) { reject({ code: 500, err }); return; }
      resolve(deletedPost);
    });
  });
}
exports.remove = async (req, res) => {
  const post = req.post;
  if (post.processed) {
    const basePath = `${storeDir}${post._id}/`;
    await removeF(basePath);
    await removePost(post);
    await requestOK(res, post);
  } else {
    res.status(403).send('File is not processed');
  }
  return;
};
exports.count = async (req, res) => {
  Post.count({}, (err, count) => {
    if (err) return res.status(500).send();
    return res.status(200).send({ message: 'OK', data: count });
  });
};
function gifToMp4(gifPath) {
  return new Promise((resolve, reject) => {
    const command = ffmpeg(gifPath).format('mp4').on('end', (err) => {
      if (err) { reject({ code: 500, err }); return; }
      resolve();
    });
    command.save(gifPath);
  });
}
function file2Byte64(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) { reject({ code: 500, err }); return; }
      resolve(new Buffer(data).toString('base64'));
    });
  });
}
exports.gif2mp4 = async (req, res) => {
  // console.log(req.body);
  let gif64 = req.body.gif64;
  gif64 = gif64.replace(/^data:(video|image)\/(jpeg|mp4|gif);base64,/, '');
  const basePath = `${storeDir}_temp_gif/`;
  const gifPath = `${basePath}${Math.round(Math.random() * 100000)}.gif`;
  try {
    await writeFileFromByte64(gifPath, gif64);
    await gifToMp4(gifPath);
    await resizeMp4(gifPath);
    let byte64mp4 = await (file2Byte64(gifPath));
    await removeF(gifPath);
    byte64mp4 = `data:video/mp4;base64,${byte64mp4}`;
    await requestOK(res, byte64mp4);
  } catch (message) {
    console.log(message);
    return res.status(message.code).send();
  }
  return null;
};

exports.get = (req, res) => {
  return res.json({ data: req.post });
};

exports.review = (req, res) => {
  req.post.review = true;
  req.post.save();
  res.status(200).send({ data: true });
};
exports.publish = (req, res) => {
  req.post.publish = !req.post.publish;
  req.post.save();
  res.status(200).send({ data: req.post.publish });
};
exports.postByID = (req, res, next, id) => {
  Post
    .findById(id)
    .populate('creator', 'displayName username avatar')
    .populate('categories', 'title')
    // .populate('type', 'title')
    .exec((err, post) => {
      if (err) {
        // console.log(1);
        return res.status(400).send();
      }
      if (!post) {
        return res.status(400).send({
          messages: [`Failed to load post ${id}`],
        });
      }
      req.post = post;
      next();
      return null;
    });
  return null;
};
exports.follow = (req, res) => {
  let isFollowed = false;
  req.post.follows.forEach((follow) => {
    follow === req.user._id && (isFollowed = true);
    return null;
  });
  if (!isFollowed) {
    Post.findByIdAndUpdate(req.post._id, {
      $addToSet: {
        follows: req.user._id,
      },
    }).exec((err) => {
      return err ? res.status(400).send() : res.status(200).send({
        data: {
          follow: true,
        },
      });
    });
  } else {
    Post.findByIdAndUpdate(req.post._id, {
      $pull: {
        follows: req.user._id,
      },
    }).exec((err) => {
      return err ? res.status(400).send() : res.status(200).send({
        data: {
          follow: false,
        },
      });
    });
  }
};

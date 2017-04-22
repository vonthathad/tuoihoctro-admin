import formidable from 'formidable';
import slug from 'slug';
import fs from 'fs';
import childProcess from 'child_process';
import superagent from 'superagent';
import Game from '../models/game.model';
const npp = 10;
exports.list = (req, res) => {
  const paging = parseInt(req.query.paging, 10) || npp;
  const page = parseInt(req.query.page, 10) || 1;
  const skip = page > 0 ? ((page - 1) * paging) : 0;
  Game.aggregate([
    {
      $project: {
        slug: 1,
        title: 1,
        des: 1,
        topic: 1,
        publish: 1,
        created: 1,
        playsCount: 1,
        sharesCount: 1,
        viewsCount: 1,
        adsImage: 1,
        link: 1,
        thumbImage: 1,
        results: 1,
        color: 1,
      },
    },
    {
      $sort: {
        created: -1,
      },
    },
    {
      $skip: skip,
    },
    {
      $limit: paging,
    },
  ], (err, result) => {
    if (err) {
      return res.status(502).send();
    }
    if (result.length === 0) {
      return res.status(404).send();
    }
    return res.json(result);
  });
};

exports.get = (req, res) => {
  return res.json(req.game);
};
function writeFileFromByte64(path, base64Data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, base64Data, 'base64', err => {
      if (err) {
        reject({
          code: 500,
          err,
        });
        return;
      }
      resolve();
    });
  });
}
function createResizeImage(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    childProcess.exec(`convert ${inputPath} -resize 360x188 ${outputPath}`, err => {
      if (err) {
        reject({
          code: 500,
          err,
        });
        return;
      }
      resolve();
    });
  });
}
function findLatestGame() {
  return new Promise((resolve, reject) => {
    Game.findOne({}, {}, { sort: { created: -1 } }, (err, latestGame) => {
      if (err) {
        reject({
          code: 500,
          err,
        });
        return;
      }
      if (!latestGame) {
        reject({
          code: 404,
          err,
        });
        return;
      }
      resolve(latestGame);
    });
  });
}
function sendToImageOptim(url) {
  return new Promise((resolve, reject) => {
    superagent.post('https://im2.io/zbvmvxpmgb/full/http://www.hotgame.co/sources/images/19_ads.jpg')
      .end((err, im2Res) => {
        if (err) {
          reject({
            code: 500,
            err,
          });
          return;
        }
        if (!im2Res) {
          reject({
            code: 404,
            err,
          });
          return;
        }
        resolve(im2Res);
      });
  });
}

function writeFileFromData(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, err => {
      if (err) {
        reject({
          code: 500,
          err,
        });
        return;
      }
      resolve();
    });
  });
}
function requestOK(res, payload) {
  return new Promise((resolve, reject) => {
    res.status(200).send({ payload });
  });
}
function parseForm(req, form) {
  return new Promise((resolve, reject) => {
    form.parse(req, (err, field, file) => {
      if (err) {
        reject({
          code: 500,
          err,
        });
        return;
      }
      resolve({ field, file });
    });
  });
}
function unzipFile(zipPath, folderPath) {
  return new Promise((resolve, reject) => {
    childProcess.exec(`unzip ${zipPath} -d ${folderPath}`, err => {
      if (err) {
        reject({
          code: 500,
          err,
        });
        return;
      }
      resolve();
    });
  });
}
function removeFolder(path) {
  return new Promise((resolve, reject) => {
    childProcess.exec(`rm -r ${path}`, err => {
      if (err) {
        reject({
          code: 500,
          err,
        });
        return;
      }
      resolve();
    });
  });
}
function removeFile(path) {
  return new Promise((resolve, reject) => {
    childProcess.exec(`rm ${path}`, err => {
      if (err) {
        reject({
          code: 500,
          err,
        });
        return;
      }
      resolve();
    });
  });
}
function moveFile(startPath, endPath) {
  return new Promise((resolve, reject) => {
    childProcess.exec(`mv ${startPath} ${endPath}`, err => {
      if (err) {
        reject({
          code: 500,
          err,
        });
        return;
      }
      resolve();
    });
  });
}
function addGame(game) {
  game.imageSrc = undefined;
  const length = game.results.length;
  const results = game.results;
  for (let i = 0; i < length; i++) {
    delete results[i].imageSrc;
    delete results[i].imageWarning;
    results[i].score = results[i].score === '' ? 0 : parseInt(results[0].score, 10);
    results[i].image = `img/result${i}.jpeg`;
  }

  return new Promise((resolve, reject) => {
    (new Game(game)).save((err, addedGame) => {
      if (err) {
        reject({
          code: 500,
          err,
        });
        return;
      }
      resolve(addedGame);
    });
  });
}
function updateGame(game) {
  game.imageSrc = undefined;
  const length = game.results.length;
  const results = game.results;
  for (let i = 0; i < length; i++) {
    delete results[i].imageSrc;
    delete results[i].imageWarning;
    results[i].score = results[i].score === '' ? 0 : parseInt(results[0].score, 10);
    results[i].image = `img/result${i}.jpeg`;
  }

  return new Promise((resolve, reject) => {
    Game.findByIdAndUpdate(game._id, game).exec((err, updatedGame) => {
      if (err) {
        reject({
          code: 500,
          err,
        });
        return;
      }
      resolve(updatedGame);
    });
  });
}
function removeGame(game) {
  return new Promise((resolve, reject) => {
    game.remove((err, deletedGame) => {
      if (err) {
        reject({
          code: 500,
          err,
        });
        return;
      }
      resolve(deletedGame);
    });
  });
}

exports.create = async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.maxFields = 1;
    form.maxFieldsSize = 5 * 1024 * 1024;
    form.multiples = false;
    const { field, file } = await parseForm(req, form);

    let newId;
    const basePath = `${__dirname}/../../public/`;
    const baseUrl = 'http://localhost:4000/';
    let game;

    if (field.game) {
      game = JSON.parse(field.game);

      newId = (await findLatestGame())._id + 1;

      game.slug = slug(game.title);
      game.created = new Date();
      game.adsImage = `sources/images/${newId}_ads.jpeg`;
      game.thumbImage = `sources/images/${newId}_thumb.jpeg`;
      game.link = `sources/games/${newId}`;
      game._id = newId;
      const base64Data = game.imageSrc.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');

      const adsPath = `${basePath}${game.adsImage}`;
      const thumbPath = `${basePath}${game.thumbImage}`;

      const adsUrl = `${baseUrl}${game.adsImage}`;
      const thumbUrl = `${baseUrl}${game.thumbImage}`;

      await writeFileFromByte64(adsPath, base64Data);
      await createResizeImage(adsPath, thumbPath);
      await writeFileFromData(adsPath, (await sendToImageOptim(adsUrl)).body);
      await writeFileFromData(thumbPath, (await sendToImageOptim(thumbUrl)).body);
    } else {
      return res.status(404).send();
    }

    if (file.zip) {
      const gameZipPath = `${basePath}${game.link}.zip`;
      const gamePath = `${basePath}${game.link}`;
      await moveFile(file.zip.path, gameZipPath);
      await unzipFile(gameZipPath, gamePath);
      await removeFile(gameZipPath);
    }

    const results = game.results;
    const length = game.results.length;
    for (let i = 0; i < length; i++) {
      const base64Data = results[i].imageSrc.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
      const resultPath = `${basePath}sources/games/${newId}/img/result${i}.jpeg`;
      await writeFileFromByte64(resultPath, base64Data);
    }

    await addGame(game);
    await requestOK(res, game);
  } catch (message) {
    console.log(message);
    return res.status(message.code).send();
  }
  return null;
};
exports.update = async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.maxFields = 1;
    form.maxFieldsSize = 5 * 1024 * 1024;
    form.multiples = false;

    const { field, file } = await parseForm(req, form);

    let currentId;
    const basePath = `${__dirname}/../../public/`;
    const baseUrl = 'http://localhost:4000/';
    let game;

    if (field.game) {
      game = JSON.parse(field.game);

      currentId = game._id;

      game.slug = slug(game.title);
      game.created = new Date();
      game.adsImage = `sources/images/${currentId}_ads.jpeg`;
      game.thumbImage = `sources/images/${currentId}_thumb.jpeg`;
      game.link = `sources/games/${currentId}`;
      if (game.imageSrc.indexOf('data:image') !== -1) {
        const base64Data = game.imageSrc.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');

        const adsPath = `${basePath}${game.adsImage}`;
        const thumbPath = `${basePath}${game.thumbImage}`;

        const adsUrl = `${baseUrl}${game.adsImage}`;
        const thumbUrl = `${baseUrl}${game.thumbImage}`;

        await writeFileFromByte64(adsPath, base64Data);
        await createResizeImage(adsPath, thumbPath);
        await writeFileFromData(adsPath, (await sendToImageOptim(adsUrl)).body);
        await writeFileFromData(thumbPath, (await sendToImageOptim(thumbUrl)).body);
      }
    } else {
      return res.status(404).send();
    }

    if (file.zip) {
      const gameZipPath = `${basePath}${game.link}.zip`;
      const gamePath = `${basePath}${game.link}`;
      await moveFile(file.zip.path, gameZipPath);
      await unzipFile(gameZipPath, gamePath);
      await removeFile(gameZipPath);
    }

    const results = game.results;
    const length = game.results.length;
    for (let i = 0; i < length; i++) {
      if (results[i].imageSrc) {
        const base64Data = results[i].imageSrc.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
        const resultPath = `${basePath}sources/games/${currentId}/img/result${i}.jpeg`;
        await writeFileFromByte64(resultPath, base64Data);
      }
    }

    await updateGame(game);
    await requestOK(res, game);
  } catch (message) {
    console.log(message);
    return res.status(message.code).send();
  }
  return null;
};
exports.delete = async (req, res) => {
  const game = req.game;
  const basePath = `${__dirname}/../../public/`;
  const adsPath = `${basePath}${game.adsImage}`;
  const thumbPath = `${basePath}${game.thumbImage}`;
  const gamePath = `${basePath}${game.link}`;
  try {
    await removeFile(adsPath);
    await removeFile(thumbPath);
    await removeFolder(gamePath);

    const results = game.results;
    const length = game.results.length;
    for (let i = 0; i < length; i++) {
      if (results[i].imageSrc) {
        const resultPath = `${basePath}sources/games/${game._id}/img/result${i}.jpeg`;
        await removeFile(resultPath);
      }
    }
    await removeGame(game);
  } catch (message) {
    console.log(message);
    return res.status(message.code).send();
  }
  return null;
};
exports.gameById = (req, res, next, id) => {
  Game.findById(id).exec((err, game) => {
    if (err) return res.status(502).send();
    if (!game) return res.status(400).send();
    req.game = game;
    return next();
  });
};

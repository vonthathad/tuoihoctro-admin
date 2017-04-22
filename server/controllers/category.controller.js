/**
 * Created by andh on 1/29/17.
 */
import Content from '../models/post.model';
import Category from '../models/category.model';
const getErrorMessage = (err) => {
  // console.log(err);
  let messages = [];
  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        messages = ['URL is exist'];
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
exports.list = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) return res.status(400).send();
    return res.json({ data: categories });
  });
};
exports.create = (req, res) => {
  const category = new Category(req.body);
  category.save((err) => {
    if (err) return res.status(400).send({ messages: getErrorMessage(err) });
    return res.json({ data: category });
  });
};
exports.get = (req, res) => {
  return res.json({ data: req.category });
};
exports.update = (req, res) => {
  Category.findByIdAndUpdate(req.category._id, req.body, (err) => {
    if (err) return res.status(400).send({ messages: getErrorMessage(err) });
    return res.json({ message: "Category's information has changed" });
  });
};
exports.remove = (req, res) => {
  Content.update({ categories: req.category._id }, { $pull: { categories: req.category._id } }, { multi: true }).exec((err) => {
    if (err) return res.status(400).send({ messages: getErrorMessage(err) });
    req.category.remove((err2, category) => {
      if (err2) return res.status(400).send({ messages: getErrorMessage(err2) });
      return res.json({ data: category });
    });
    return null;
  });
};
exports.categoryByURL = (req, res, next, id) => {
  Category.findById(id)
    .exec((err, category) => {
      if (err) {
        return res.status(400).send();
      }
      if (!category) {
        return res.status(400).send({ messages: [`Failed to load category ${id}`] });
      }
      req.category = category;
      next();
      return null;
    });
};

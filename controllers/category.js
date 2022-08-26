const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, cate) => {
    if (err) {
      return res.status(400).json({
        error: "category not found in db",
      });
    }
    req.category = cate;
    next();
  });
};

exports.createcategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "not able to save category in db",
      });
    }
    res.json({category});
  });
};

exports.getcategory =(req,res)=>{
    return res.json(req.category);
};

exports.getallcategory =(req,res)=>{
    Category.find().exec((err,categories)=>{
        if (err) {
            return res.status(400).json({
              error: "no categories found",
            });
        }
            res.json(categories);
    });
};
exports.updatecategory=(req,res)=>{
    const category = req.category;
    category.name = req.body.name;

    category.save((err,updatedcategory)=>{
        if (err) {
            return res.status(400).json({
              error: "failed to update category",
            });
        }
        res.json(updatedcategory);
    });

};
exports.removecategory=(req,res)=>{
    const category = req.category;


    category.remove((err,category)=>{
        if (err) {
            return res.status(400).json({
              error: "failed to deleted category",
            });
        }
        res.json({
            massage:"Successfully deleted"
        });
    });
};


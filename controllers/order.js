const { Order, ProductCart } = require("../models/order");

exports.getorderById = (req, res, next, id) => {
  Order.findById(id),
    populate("products.product", "name price").exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No order found in db",
        });
      }
      req.order = order;
      next();
    });
};

exports.createorder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "failed to save order in db",
      });
    }
    res.json(order);
  });
};

exports.getallorders = (req, res) => {
  Order.find()
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "no order  found in db",
        });
      }
      res.json(order);
    });
};

exports.getorderstatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};
exports.updatestatus = (req, res) => {
  Order.update(
    { _id: req.body.orderid },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: "Cannot Update Order Status",
        });
      }
      res.json(order);
    }
  );
};

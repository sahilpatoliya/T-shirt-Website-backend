const user = require("../models/user");
const order = require("../models/order");


exports.getUserById =(req,res,next, id) => {
    user.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error:"No user was found in DB"
            });
        }
        req.profile = user;
        next(); 
    });
};

exports.getuser =(req,res)=>{
    // get back here for password
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    return res.json(req.profile);
};

exports.getalluser=(req,res)=>{
    user.find().exec((err,users)=>{
        if(err || !users){
            return res.status(400).json({
                error:"no user found"
            });
        } 
            res.json(users);
    });

};
exports.updateuser=(req,res)=>{
    user.findByIdAndUpdate(
        {_id : req.profile._id},
        {$set:req.body},
        {new:true,useFindAndModify:false},
        (err,user)=>{
            if(err){
                return res.status(400).json({
                    error:"You Are Not Able To Update Data"
                });
            }
            res.json(user);
        }
    );
};


exports.userpurchaselist= (req,res)=>{
    order.find({user:req.profile._id})
    .populate("user","_id name")
    .exec((err,order) => {
        if(err){
            return res.status(400).json({
                error:"no order in this account"
            });
        }
        return res.json(order);
    });
};

exports.pushorderinpurchaselist = (req,res,next)=>{
    
    let purchases = [];
    req.body.order.products.forEach(product => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        });
    });
    //store in db
    user.findOneAndUpdate(
        { _id: req.profile._id},
        { $push:{purchases: purchases}},
        { new: true},
        (err,purchases) =>{
            if(err){
                return res.status(400).json({
                        error:"unable to save purchase list"
                });
            }
            next();
        }
    );
   
};
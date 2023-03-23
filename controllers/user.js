const userModel = require("../models/user");
const gameModel = require("../models/games");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");


function createUser(user){
  return userModel.create(user);
}

// const createUser=async (req, res, next) => {
//   var user = req.body;
//   try {
//     var savedUser = await userModel.create(user)
//     res.status(201).json(savedUser);
//   } catch (err) {
//     res.status(422).json({ message: err.message });
//   }
// }

const updateUserInfo=async (req, res) => {
  try {
    var id = req.params.id;
    var doc = req.body;
    var updatedUser = await userModel.findByIdAndUpdate(
      { _id: id },
      doc);
    res.json(updatedUser);
  } catch (err) {
    res.json({ message: err.message });
  }
}

// function deleteUserAcount(id) {
//   return userModel.deleteOne({ _id: id, });
// }

const getpurchaseHistory = async (req, res, next) => {
  var id = req.params.id;
  try {
    var user = await userModel.find({ _id: id })
    var purchaseHistoryList = user[0].cart
    for (let i = 0; i < purchaseHistoryList.length; i++) {
      var game = await gameModel.find({ _id: purchaseHistoryList[i] })

    }
    res.status(200).json(game);

  } catch (err) {
    res.json({ message: err.message });
  }
}

const getCartList = async (req, res, next) => {
  var id = req.params.id;
  try {
    var user = await userModel.find({ _id: id })
    var cartList = user[0].cart
    for (let i = 0; i < cartList.length; i++) {
      var game = await gameModel.find({ _id: cartList[i] })

    }
    res.status(200).json(game);

  } catch (err) {
    res.json({ message: err.message });
  }
}

const getWishList = async (req, res, next) => {
  var id = req.params.id;
  try {
    var user = await userModel.find({ _id: id })
    var List = user[0].wishList
    for (let i = 0; i < List.length; i++) {
      var game = await gameModel.find({ _id: List[i] })
    }
    res.status(200).json(game);

  } catch (err) {
    res.json({ message: err.message });
  }
}




async function login(req, res) {
  var { email, password } = req.body;
  var user = await userModel.findOne({ email });
  if (user) {
    var valid = bcrypt.compareSync(password, user.password);
    if (valid) {
      var token = jwt.sign(
        {
          userId: user._id,
          displayName: user.displayName,
        },
        process.env.SECRET
      );
      res.status(200).json(token);
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } else {
    res.status(401).end();
  }
}


module.exports = {  getpurchaseHistory, getCartList, getWishList,updateUserInfo, createUser, login };
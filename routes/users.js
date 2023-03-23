var express = require("express");
var router = express.Router();
const userModel = require("../models/user");
const gameModel = require("../models/games");
const { getpurchaseHistory,getCartList,getWishList,updateUserInfo,createUser,login } = require("../controllers/user");


router.post("/", async(req, res, next) => {
  var user =req.body
  try{
    var createdUser=await createUser(user)
    res.status(200).json(createdUser)
  }catch(err){
    res.status(422).json({ message: err.message });
  }
});


router.get("/:id/wishList", getWishList);
router.get("/:id/cart",getCartList );
router.get("/:id/purchaseHistory", getpurchaseHistory);


router.patch("/:id", updateUserInfo);

router.delete("/:id", async (req, res) => {
  try {
    var id = req.params.id;
    var deletedUser = await userModel.deleteOne({
      _id: id,
    });
    res.json(deletedUser);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.post("/login", login);

module.exports = router;
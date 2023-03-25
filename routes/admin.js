const express = require("express");
var router = express();

var AdminModel = require("../models/admin");

router.post("/", async (req, res, next) => {
  // create admin
  try {
    var Admin = req.body;
    var savedAdmin = await AdminModel.create(Admin);
    res.status(201).json(savedAdmin);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  // delete admin
  var id = req.params.id;
  try {
    var deletedAdmin = await AdminModel.deleteOne({ _id: id });
    res.status(201).json(deletedAdmin);
  } catch (err) {
    res.json({ message: err.message });
  }
});

module.exports = router;

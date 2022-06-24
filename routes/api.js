const express = require("express");
const router = express.Router();
const Products = require("../models/products");

// get using sort option
router.get("/:sortOption", async (req, res) => {
  try {
    let productData;
    switch (req.params.sortOption) {
      case "Low":
        return res.json(
          (productData = await Products.find().sort({ price: 1 }))
        );
      case "High":
        return res.json(
          (productData = await Products.find().sort({ price: -1 }))
        );
      case "Ascending":
        return res.json(
          (productData = await Products.find().sort({ name: 1 }))
        );
      case "Descending":
        return res.json(
          (productData = await Products.find().sort({ name: -1 }))
        );
      case "Recommended":
        return res.json(
          (productData = await Products.find({ recommended: true }))
        );
      default:
        return res.json((productData = await Products.find()));
    }
  } catch {
    res.status(400).json;
  }
});

// create one
router.post("/", async (req, res) => {
  try {
    const productData = await Products.create({
      name: req.body.name,
      price: req.body.price,
      recommended: req.body.recommended,
    });
    res.json(productData);
  } catch {
    res.status(400).json;
  }
});

module.exports = router;

// copy into REST Client extension file for quick access
// GET http://localhost:3001/api/Ascending

// ###

// POST http://localhost:3001/api
// Content-Type: application/json

// {
//     "name": "asdpadample2",
//     "price": "40",
//     "recommended":false
// }
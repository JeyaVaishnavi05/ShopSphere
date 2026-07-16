const express = require("express");
const router = express.Router();
const Product = require("../models/Product");


/* =========================
   ADD PRODUCT (ADMIN)
========================= */

router.post("/add", async (req, res) => {
  try {

    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category.toLowerCase(),
      description: req.body.description,
      image: req.body.image
    });

    await product.save();

    res.status(201).json({ message: "Product added successfully", product });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


/* =========================
   GET PRODUCTS (STORE)
   FILTER + SEARCH + SORT
========================= */

router.get("/", async (req, res) => {
  try {

    let { category, minPrice, maxPrice, sort, search } = req.query;

    let filter = {};
    let sortOption = {};

    // Category filter
    if (category) {
      filter.category = category.toLowerCase();
    }

    // Price filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Search (name + description)
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    // Sorting
    if (sort === "priceLow") sortOption.price = 1;
    if (sort === "priceHigh") sortOption.price = -1;
    if (sort === "nameAZ") sortOption.name = 1;
    if (sort === "nameZA") sortOption.name = -1;

    const products = await Product.find(filter).sort(sortOption);

    res.json(products);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});


/* =========================
   RECOMMENDATIONS
========================= */

router.get("/recommend/:category", async (req, res) => {

  try {

    const products = await Product.find({
      category: req.params.category.toLowerCase()
    }).limit(4);

    res.json(products);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

});


/* =========================
   GET SINGLE PRODUCT
========================= */

router.get("/:id", async (req, res) => {

  try {

    const product = await Product.findById(req.params.id);

    res.json(product);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

});

//UPDATE PRODUCT

router.put("/:id", async (req,res)=>{

try{

const updatedProduct = await Product.findByIdAndUpdate(
req.params.id,
req.body,
{ new:true }
);

res.json(updatedProduct);

}catch(err){

res.status(500).json({error:err.message});

}

});


/* =========================
   DELETE PRODUCT (ADMIN)
========================= */

router.delete("/:id", async (req, res) => {

  try {

    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product deleted successfully" });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

});



module.exports = router;
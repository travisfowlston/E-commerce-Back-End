const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [Product],
    });
    res.json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [Product],
    });

    if (!category) {
      return res
        .status(404)
        .json({ message: "The category you are looking for was not found" });
    }

    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const createNewCategory = await Category.create(req.body);
    res.status(201).json(createNewCategory);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res
        .status(404)
        .json({ message: "The category you are looking for was not found" });
    }

    await category.update(req.body);

    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res
        .status(404)
        .json({ message: "The category you are looking for was not found" });
    }

    await category.destroy();

    res.json({ message: "The category was deleted successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

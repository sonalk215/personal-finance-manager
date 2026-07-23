const Category = require('../models/Category');
const Transaction = require('../models/Transaction');

// POST /api/categories
// Create Category
const createCategory = async (req, res) => {
  try {
    const { name, color, icon } = req.body;

    if (!name) {
      return res.status(400).json({
        message: 'Category name is required',
      });
    }

    const existingCategory = await Category.findOne({
      userId: req.user.id,
      name,
    });

    if (existingCategory) {
      return res.status(400).json({
        message: 'Category with this name already exists',
      });
    }

    const category = await Category.create({
      userId: req.user.id,
      name,
      color,
      icon,
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET /api/categories
// Get all categories for logged-in user
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({
      userId: req.user.id,
    }).sort({ name: 1 });

    res.json(categories);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// PUT /api/categories/:id
// Update Category
const updateCategory = async (req, res) => {
  try {
    const category = await Category.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!category) {
      return res.status(404).json({
        message: 'Category not found',
      });
    }
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE /api/categories/:id
// Delete Category
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!category) {
      return res.status(404).json({
        message: 'Category not found',
      });
    }

    const transactionExists = await Transaction.findOne({
      category: req.params.id,
      userId: req.user.id,
    });
    if (transactionExists) {
      return res.status(400).json({
        message: 'Category is being used by one or more transactions.',
      });
    }
    await Category.findByIdAndDelete(req.params.id);
    res.json({
      message: 'Category deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};

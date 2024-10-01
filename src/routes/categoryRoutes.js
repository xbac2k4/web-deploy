import express from "express";
const router = express.Router();
import categoryController from '../controllers/categoryController';

// Định nghĩa các route

router.get('/', categoryController.getAllCategories);
router.post('/', categoryController.createCategory);
router.get('/:id', categoryController.getCategoryById);
router.put('/:id', categoryController.updateCategory);
router.post('/manufacturer', categoryController.getCategoriesByManufacturer);
// router.delete('/:id', categoryController.deleteCategory);
router.post('/search', categoryController.handleSearchCategories);

module.exports = router;

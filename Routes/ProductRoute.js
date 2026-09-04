const express = require('express');
const upload = require('../Middleware/upload');


const { protect } = require('../Middleware/auth');

const { authorize } = require('../Middleware/role');

const router = express.Router();

const productController = require('../Controllers/ProductController');

router.post('/createProduct', protect, authorize('Superadmin'), productController.createProduct);
router.post('/createProductWithImage', upload.single('image'), protect, productController.createProductWithImage);

router.put('/updateProduct/:id', protect, productController.updateProduct);
router.get('/getAllProducts', protect, productController.getAllProducts);        
router.get('/getProductById/:id', protect, productController.getProductById);     
router.delete('/deleteProduct/:id', protect, productController.deleteProduct);   

module.exports = router;
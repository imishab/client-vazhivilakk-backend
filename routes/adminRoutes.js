const express = require('express');
const { signup,
    signin,
    signout,
    getAllUsers,
    // getAllProducts,
    // deleteProduct,
    addCategory,
    getAllCategories,
    deleteCategory,
    getAllOrders,
    aiImage,

} = require('../controllers/adminController');
const {
    addVoice,
    upload,
    getAllVoices,
    deleteVoice
} = require('../controllers/voiceController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

///////////////AUTH////////////////////////
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', protect, signout);
router.get('/profile', protect, (req, res) => {
    res.json(req.admin);
});

///////////////USERS////////////////////////
router.get('/users', protect, getAllUsers, (req, res) => {
    res.json(req.admin);
});

///////////////PRODUCTS////////////////////////
// router.post('/add-product', protect, upload.single('image'), addProduct);
// router.get('/all-products', protect, getAllProducts);
// router.delete('/delete-product/:id', protect, deleteProduct);


///////////////CATEGORY////////////////////////
router.post('/add-category', protect, upload.single('image'), addCategory);
router.get('/all-categories', protect, getAllCategories);
router.delete('/delete-category/:id', protect, deleteCategory);

///////////////ORDERS////////////////////////
router.get('/all-orders', protect, getAllOrders);


router.post('/ai-image', protect, aiImage);

///////////////VOICES////////////////////////
router.get('/all-voices', protect, getAllVoices);
router.post('/add-voice', protect, upload.single('audio'), addVoice);
router.delete('/delete-voice/:id', protect, deleteVoice);



module.exports = router;

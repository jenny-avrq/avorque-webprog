const express = require('express');
const upload = require('../middlewares/upload');

// Import functions
const {
    getGigs,
    getGigById,
    createGig,
    updateGig,
    deleteGig,
} = require('../controllers/gigContoller');

const router = express.Router();

router.route('/')
    .get(getGigs)
    .post(upload.single('image'), createGig);

router.route('/:id')
    .get(getGigById).
    put(upload.single('image'), updateGig).
    delete(deleteGig);

module.exports = router;
'use strict';

const express = require('express');
const BarcodeController = require('../controllers/barcode.controller')
const router = express.Router();
const { isAuthenticated } = require('../middlewares/auth.middleware');
router.use(isAuthenticated)
router.post('/genator', BarcodeController.BarcodeGenator);
router.get('/read', BarcodeController.ReadBarcode);
module.exports = router
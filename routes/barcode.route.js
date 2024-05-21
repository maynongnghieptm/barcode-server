'use strict';

const express = require('express');
const BarcodeController = require('../controllers/barcode.controller')
const BeckmanController = require('../controllers/beckman.controller')
const router = express.Router();
const { isAuthenticated } = require('../middlewares/auth.middleware');
router.use(isAuthenticated)
router.post('/genator', BarcodeController.BarcodeGenator);
router.post('/beckman_genator', BeckmanController.Genator)
router.get('/read', BarcodeController.ReadBarcode);
router.get('/read_beckman', BeckmanController.Read);
module.exports = router
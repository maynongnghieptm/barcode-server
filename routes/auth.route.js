const express = require('express');
const router = express.Router();
console.log(router)
const AuthController = require("../controllers/auth.controller")
// Định nghĩa các tuyến đường cho phần home
router.post('/login', AuthController.Login);
router.get('/refresh-token', AuthController.RefreshToken);
module.exports = router;

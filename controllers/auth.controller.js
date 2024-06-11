const AuthService = require("../services/auth.service")
const UserSchema = require("../models/user.modal")
class AuthController{
    static async Login(req, res, next){
        try {
            const login = await AuthService.Login(req.body.username, req.body.passwd)
            console.log(login)
            return res.status(200).json({
                code: 200,
                message: 'Login successfully',
                uid: login.userId,
                token: login.token,
                refreshToken: login.refreshToken
            });
        } catch (error) {
            return res.json({
                code: error.statusCode || 500,
                message: error.message || 'Login fail',
            });
        }
    }
    static async Register(req, res, next){
        try {
            const username = req.body.username
            const password = req.body.password
            await AuthService.Register(username,password)
            return res.status(200).json({
                code: 200,
                message: 'Create new account successfully',
                
            });
        } catch (error) {
            return res.json({
                code: error.statusCode || 500,
                message: error.message || 'Internal Server Error',
            });
        }
    }
    static async RefreshToken(req, res, next){
        try {
            const refreshToken  = req.query.refreshToken
            const uid = req.headers['x-user-id']
            const newAccessToken = await AuthService.RefreshToken(uid,refreshToken )
            return res.status(200).json({
                code: 200,
                message: 'Get new access token sucessfully',
                accessToken: newAccessToken
            });
        } catch (error) {
            return res.json({
                code: error.statusCode || 500,
                message: error.message || 'Invalid request',
            });
        }
    }
}
module.exports = AuthController
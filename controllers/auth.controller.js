const AuthService = require("../services/auth.service")
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
            });
        } catch (error) {
            return res.json({
                code: error.statusCode || 500,
                message: error.message || 'Internal Server Error',
            });
        }
    }
}
module.exports = AuthController

const {  SECRET_KEY } = require("../constants");
const { verifyToken } = require("../utils/auth");

const isAuthenticated = async (req, res, next) => {
    try {
        
        const userId = req.headers['x-user-id']
        if (!userId) {
            throw new Error('Invalid request');
        }
        const accessToken = req.headers.authorization;
        if (!accessToken) {
            throw new Error('Invalid request');
        }
        const decodedUser = verifyToken(accessToken.split(' ')[1], SECRET_KEY);
       // console.log('decodedUser: ', decodedUser);
       if (decodedUser.userId !== userId) {
        throw new Error('Invalid user')
    }
        req.user = decodedUser;
        return next();
    } catch (err) {
        next(err);
    }
}
module.exports = {
    isAuthenticated,
}
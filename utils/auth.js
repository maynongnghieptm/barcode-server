const JWT = require('jsonwebtoken');

const createToken = (payload, secretKey) => {
    try {
        const accessToken = JWT.sign(payload, secretKey, {
            expiresIn: '10s',
        });
        return accessToken;
    } catch (err) {
        throw err;
    
    }
}
const createRefreshToken = (payload, secretKey) => {
    try {
        const refreshToken = JWT.sign(payload, secretKey, {
            expiresIn: '1m',
        });
        return refreshToken;
    } catch (err) {
        throw err;
    
    }
}

const verifyToken = (token, secretKey) => {
    try {
      //  console.log(22222)
        const decoded = JWT.verify(token, secretKey);
        return decoded;
    } catch (error) {
       
        throw error;
    }
   
}

module.exports = {
    createToken,
    createRefreshToken,
    verifyToken,
}
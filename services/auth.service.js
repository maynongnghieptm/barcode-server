const UserSchema = require("../models/user.modal")
const RefreshTokenSchema = require("../models/refreshToken.modal")
const bcrypt = require('bcryptjs');
const { createToken, createRefreshToken, verifyToken } = require("../utils/auth");
const { SECRET_KEY } = require("../constants");
class AuthService {
    static async Login(username, password) {
       // console.log(UserSchema)
        const user = await UserSchema.findOne({ username });
        //console.log(user)
        if (!user) {
            throw new Error('User has not been registed');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }
        // const isCorrectPassword = await bcrypt.compare(password, user.password);
        /*
                if(!isCorrectPassword) {
                    throw new Error('Password is incorrect');
                }
        */
        const id = user._id.toString();
        const accessToken = createToken({ userId: user._id }, SECRET_KEY);
        const refreshToken = createRefreshToken({ userId: user._id }, SECRET_KEY);
        await RefreshTokenSchema.create({
            userId: user._id,
            refreshToken: refreshToken,
        });
        return { token: accessToken,refreshToken:refreshToken , userId: id }


    }
    static async Register(username, password){
        const isExist = await UserSchema.findOne({username: username})
        if(isExist){
            throw new Error('Error: Username has been already registed');
        }
        await UserSchema.create({username: username, password: password});
        return {message: 'User created successfully'}
    }
    static async RefreshToken(uid, refrToken) {
        const storedRefreshTokens = await RefreshTokenSchema.find({ userId: uid });
        if (storedRefreshTokens && storedRefreshTokens.length > 0) {
            const matchingToken = storedRefreshTokens.find(tokenDoc => tokenDoc.refreshToken === refrToken);
            if (matchingToken) {
                try {
                    const decodedRefreshToken = verifyToken(refrToken, SECRET_KEY);
                    if (decodedRefreshToken) {
                        const newAccessToken = createToken({ userId: uid }, SECRET_KEY);

                        // Xóa refresh token cũ và tạo mới
                      
                        return { newAccessToken };
                    }
                } catch (err) {
                    //console.log()
                    
                    if (err.message === 'jwt expired') {
                        // Xóa refresh token khi hết hạn
                        await RefreshTokenSchema.deleteOne({ userId: uid, refreshToken: refrToken});
                        throw new Error('Refresh token expired');
                    
                  
                }
                   // throw new Error('Invalid refresh token');
                }
            } else {
                throw new Error('Invalid refresh token');
            }
        } else {
            throw new Error('Invalid refresh token');
        }
    }
}
module.exports = AuthService
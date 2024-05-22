const UserSchema = require("../models/user.modal")
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
        if (password !== user.password) {
            throw new Error('Password is incorrect');
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
        await UserSchema.updateOne(
            { _id: user._id },
            { $set: { refreshToken } }
        );
        return { token: accessToken,refreshToken:refreshToken , userId: id }


    }
    static async RefreshToken(uid, refrToken) {
        const user = await UserSchema.findOne({ _id: uid });
        if (!user) {
            throw new Error('User has not been registered');
        }

        const storedRefreshToken = user.refreshToken;
        if (storedRefreshToken && refrToken  ===  storedRefreshToken) {
            console.log(111111)
            try {
                console.log(refrToken)
                const decodedRefreshToken = verifyToken(refrToken, SECRET_KEY);
                console.log(22222)
                if (decodedRefreshToken) {
                    const newAccessToken = createToken({ userId: uid }, SECRET_KEY);
                    return { newAccessToken };
                }
            } catch (err) {
                throw new Error('Invalid refresh token');
            }
        } else {
            throw new Error('Invalid refresh token');
        }
    }
}
module.exports = AuthService
const UserModel = require("../models/user.modal")
const { createToken } = require("../utils/auth");
const { SECRET_KEY } = require("../constants");
class AuthService{
    static async Login (username, password){
        console.log(username,password)
        const user = await UserModel.findOne({ username });
        if(!user) {
            throw new Error('User has not been registed');
        }
        if (password!==user.password){
            throw new Error('Password is incorrect');
        }
       // const isCorrectPassword = await bcrypt.compare(password, user.password);
/*
        if(!isCorrectPassword) {
            throw new Error('Password is incorrect');
        }
*/
const id = user._id.toString(); 
        const accessToken = createToken({ userId: user._id}, SECRET_KEY);
        return {token:accessToken, userId:id}
            
        
    }
}
module.exports=AuthService
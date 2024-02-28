
const SECRET_KEY = process.env.SECRET_KEY;
const MONGO_URI = process.env.MONGO_URI;
const MONGO_DATABASE = process.env.MONGO_DATABASE;

const HEADER = {
    USER_ID: 'x-user-id',
    AUTHORIZATION: 'authorization'
}
module.exports = {
 
    SECRET_KEY,
    MONGO_URI,
    MONGO_DATABASE,
    HEADER,
}
require('dotenv').config();

const PORT = process.env.PORT;
const JWT_KEY = process.env.JWT_KEY;
const MONGODBURI = process.env.NODE_ENV === 'test' ? process.env.TEST_DB : process.env.MONGODBURI

module.exports = {
    PORT,MONGODBURI,JWT_KEY
}
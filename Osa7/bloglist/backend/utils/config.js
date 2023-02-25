require('dotenv').config()

const PORT = 3001
const MONGODB_URI = 'mongodb+srv://admin:admin@cluster0.454j8sa.mongodb.net/main?retryWrites=true&w=majority'

    //    process.env.NODE_ENV === 'test'
    //? process.env.TEST_MONGODB_URI
    //:

module.exports = {
    MONGODB_URI,
    PORT
}

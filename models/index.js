const mongoose = require('mongoose')

  const connectToDatabase = async() => {
    try {
        await mongoose.connect(process.env.DATABASE_URL)
        console.log(`Mongo is Connected!`.cyan.underline.bold)
    } catch (err) {
        error.message(err);
    }
}

module.exports = connectToDatabase;
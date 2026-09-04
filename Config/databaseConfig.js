// const mongoose = require('mongoose');
// require('dotenv').config(); // add this here too

// const connectDB = async () => {
//   try {
//     console.log("Trying to connect with:", process.env.MONGO_URI); // ADD THIS LINE
//     const conn = await mongoose.connect(process.env.MONGO_URI);
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

const mongose = require('mongoose');

const connectDB = async() => {
    try {
        const conn = await mongose.connect(process.env.MONGO_URI);
        console.log(`MongoDb Connected ${conn.connection.host}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
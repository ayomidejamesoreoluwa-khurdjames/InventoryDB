// require('dotenv').config();
// const express = require('express');
// const app = express();
// const connectDB = require('./Config/databaseConfig');
// const productRoute = require('./Routes/ProductRoute');

// app.use(express.json());
// app.use('/products', productRoute);

// const PORT = process.env.PORT || 8000; // fallback

// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// }).catch(err => console.log(err));



const express = require('express');
const app = express();

const dotenv = require('dotenv');
const connectDB = require('./Config/databaseConfig');
const productRoute = require('./Routes/ProductRoute');

dotenv.config();
connectDB();

app.use(express.json());
app.use('/products', productRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
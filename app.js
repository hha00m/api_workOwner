const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
require('dotenv').config();
// import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const cityRoutes = require('./routes/city');
const clientRoutes = require('./routes/client');
const productRoutes = require('./routes/product');
const branchRoutes = require('./routes/branch');
const orderStatusRoutes = require('./routes/orderStatus');
const townRoutes = require('./routes/town');
const storeRoutes = require('./routes/store');
const clientDeliveryPriceRoutes = require('./routes/clientDeliveryPrice');

// app
const app = express();

// db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB Connected'));

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// routes middleware
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', cityRoutes);
app.use('/api', clientRoutes);
app.use('/api', productRoutes);
app.use('/api', branchRoutes);
app.use('/api', orderStatusRoutes);
app.use('/api', townRoutes);
app.use('/api', storeRoutes);
app.use('/api', clientDeliveryPriceRoutes);

const port = process.env.PORT || 8050;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

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
const governmentRoutes = require('./routes/government');
const pageRoutes = require('./routes/page');
const deliveryCompanyNameRoutes = require('./routes/2_deliveryCompanyName');
const deliveryPriceForCompanyRoutes = require('./routes/2_deliveryPriceForCompany');
const jobTitleRoutes = require('./routes/jobTitle');
const clientRoutes = require('./routes/client');
const clientDeletedRoutes = require('./routes/clientDeleted');
const productRoutes = require('./routes/product');
const branchRoutes = require('./routes/branch');
const orderStatusRoutes = require('./routes/orderStatus');
const townRoutes = require('./routes/town');
const storeRoutes = require('./routes/store');
const deletedStoreRoutes = require('./routes/deletedStore');
const clientDeliveryPriceRoutes = require('./routes/clientDeliveryPrice');
const addressRoutes = require('./routes/address');
const staffRoutes = require('./routes/staff');
const roleRoutes = require('./routes/role');
const messageRoutes = require('./routes/messages');
const invoRoutes = require('./routes/invoice');
const receiptRoutes = require('./routes/receipt');
const trackingRoutes = require('./routes/tracking');
const orderTypeRoutes = require('./routes/orderType');
const orderRoutes = require('./routes/order');
const ruleRoutes = require('./routes/rule');
const partnerRoutes = require('./routes/partner');
const websitePageRoutes = require('./routes/websitePage');
const permissionRoutes = require('./routes/permission');
const employeeRoutes = require('./routes/employee');
const moneyStatusRoutes = require('./routes/moneyStatus');
const attNRoutes = require('./routes/2_attributeName');
const attCRoutes = require('./routes/2_AttributeConfiguration');

// app
const app = express();

// db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    autoIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB Connected'))
  .catch((err) => console.log(err));

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.disable('etag');

// routes middleware
app.use('/api', ruleRoutes);
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', governmentRoutes);
app.use('/api', pageRoutes);
app.use('/api', websitePageRoutes);
app.use('/api', clientRoutes);
app.use('/api', clientDeletedRoutes);
app.use('/api', productRoutes);
app.use('/api', branchRoutes);
app.use('/api', orderStatusRoutes);
app.use('/api', townRoutes);
app.use('/api', storeRoutes);
app.use('/api', deletedStoreRoutes);
app.use('/api', clientDeliveryPriceRoutes);
app.use('/api', addressRoutes);
app.use('/api', townRoutes);
app.use('/api', staffRoutes);
app.use('/api', roleRoutes);
app.use('/api', messageRoutes);
app.use('/api', invoRoutes);
app.use('/api', receiptRoutes);
app.use('/api', trackingRoutes);
app.use('/api', orderTypeRoutes);
app.use('/api', orderRoutes);
app.use('/api', jobTitleRoutes);
app.use('/api', partnerRoutes);
app.use('/api', permissionRoutes);
app.use('/api', employeeRoutes);
app.use('/api', moneyStatusRoutes);
app.use('/api', deliveryCompanyNameRoutes);
app.use('/api', deliveryPriceForCompanyRoutes);
app.use('/api', attCRoutes);
app.use('/api', attNRoutes);

const port = process.env.PORT || 8050;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

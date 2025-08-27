var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var servicesRouter=require('./routes/services')
var brandsRouter=require('./routes/brands')
var productsRouter=require('./routes/products')
var productColorsRouter=require('./routes/productColors')
var productVarientsRouter=require('./routes/productVarients')
var productDetailsRouter=require('./routes/productDetails')
var morePicturesRouter=require('./routes/morepictures')
var adsRouter=require('./routes/ads')
var userinterfaceRouter=require('./routes/userinterface')
var adminRouter=require('./routes/admin')
var smsapiRouter=require('./routes/smsapi')
var ordersRouter=require('./routes/orders')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/services',servicesRouter)
app.use('/brands',brandsRouter)
app.use('/products',productsRouter)
app.use('/productColors',productColorsRouter)
app.use('/productVarients',productVarientsRouter)
app.use('/productDetails',productDetailsRouter)
app.use('/morePictures',morePicturesRouter)
app.use('/ads',adsRouter)
app.use('/userinterface',userinterfaceRouter)
app.use('/admin',adminRouter)
app.use('/smsapi',smsapiRouter)
app.use('/orders',ordersRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

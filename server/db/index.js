'use strict';
var db = require('./_db');

// eslint-disable-next-line no-unused-vars
var User = require('./models/user');
var Address = require('./models/address');
var Review = require('./models/review');
var Order = require('./models/order');
var OrderItem = require('./models/orderitem');
var Instrument = require('./models/instrument');
var Email = require('./models/email');
var Contact = require('./models/contact');

// if we had more models, we could associate them in this file
// e.g. User.hasMany(Reports)

Contact.belongsTo(User);
User.hasMany(Contact);

User.hasMany(Email);
Email.belongsTo(User);
User.hasMany(Address);
User.hasMany(Review);
User.hasMany(Order);
Review.belongsTo(User);
Order.belongsTo(User);
Order.hasMany(OrderItem);
Instrument.hasMany(Review);
Instrument.hasMany(OrderItem);
OrderItem.belongsTo(Instrument);
Address.hasMany(Order);
Order.belongsTo(Address);

module.exports = db;


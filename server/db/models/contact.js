var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('contact', {
    emailAddress:{
        type: Sequelize.TEXT,
        allowNull: false,
    },
    toWhom:{
        type:Sequelize.TEXT,
    },
});
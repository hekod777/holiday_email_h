var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('email', {
    emailAddress:{
        type: Sequelize.TEXT,
        allowNull: false,
    },
    toWhom:{
        type:Sequelize.TEXT,
    },
    fromWhom:{
        type: Sequelize.TEXT,
    },
    reason:{
        type: Sequelize.TEXT,
    },
    picUrl:{
        type: Sequelize.TEXT,
    },
    isSent:{
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    template:{
        type:Sequelize.TEXT,
    }
});
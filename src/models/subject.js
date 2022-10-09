const Sequelize = require('sequelize');
const sequelize = require('../db').sequelize;

const Subject = sequelize.define('subject', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

module.exports.Subject = Subject

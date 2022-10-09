const Sequelize = require('sequelize');
const sequelize = require('../db').sequelize;

const Room = sequelize.define('room', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    capacity: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports.Room = Room

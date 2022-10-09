const Sequelize = require('sequelize');
const sequelize = require('../db').sequelize;

const Room = sequelize.define('room', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    capacity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: {
                args: [[0]],
                msg: "Room capacity must not be negative"
            }
        }
    }
});

module.exports.Room = Room

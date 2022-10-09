const Sequelize = require('sequelize');
const sequelize = require('../db').sequelize;

const Group = sequelize.define('group', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    grade: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: {
                args: [[0]],
                msg: "Grade must not be negative"
            }
        }
    }
});

module.exports.Group = Group

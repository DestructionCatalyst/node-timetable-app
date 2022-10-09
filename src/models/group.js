const Sequelize = require('sequelize');
const sequelize = require('../db').sequelize;

const Group = sequelize.define('group', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    grade: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports.Group = Group

const Sequelize = require('sequelize');
const sequelize = require('../db').sequelize;

const Teacher = sequelize.define('teacher', {
    last_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    middle_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Must be a valid email address',
            }
        }
    }
});

module.exports.Teacher = Teacher

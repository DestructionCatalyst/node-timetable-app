const Sequelize = require('sequelize');
const {Group} = require("./group");
const sequelize = require('../db').sequelize;
const Lesson = require("./lesson").Lesson

const Appointment = sequelize.define('appointment', {
    start_time: {
        type: Sequelize.DATE,
        allowNull: false
    },
    end_time: {
        type: Sequelize.DATE,
        allowNull: false
    },
    type: {
        type: Sequelize.ENUM,
        values: ['compulsory', 'elective', 'facultative'],
        allowNull: false
    }
});

const LessonAppointment = sequelize.define("lesson_appointment", {});

Appointment.belongsToMany(Lesson, {through: LessonAppointment});
Lesson.belongsToMany(Appointment, {through: LessonAppointment});

module.exports.Appointment = Appointment


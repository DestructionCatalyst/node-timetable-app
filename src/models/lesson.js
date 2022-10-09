const Sequelize = require("sequelize");
const sequelize = require("../db").sequelize;
const Room = require("./room").Room
const Group = require("./group").Group
const Teacher = require("./teacher").Teacher
const Subject = require("./subject").Subject


const Lesson = sequelize.define("lesson", {});
const Enrollment = sequelize.define("enrollment", {});

Room.hasMany(Lesson, {foreignKey: { allowNull: false }, onDelete: "RESTRICT"});
Teacher.hasMany(Lesson, {foreignKey: { allowNull: false }, onDelete: "RESTRICT"});
Subject.hasMany(Lesson, {foreignKey: { allowNull: false }, onDelete: "CASCADE"});
Group.belongsToMany(Lesson, {through: Enrollment});
Lesson.belongsToMany(Group, {through: Enrollment});

module.exports.Lesson = Lesson


const express = require("express");
const Group = require("../models/group").Group
const Room = require("../models/room").Room
const Subject = require("../models/subject").Subject
const Teacher = require("../models/teacher").Teacher
const simpleCRUDOperations = require("../utils/crud").simpleCRUDOperations


const apiRouter = express.Router()
const jsonParser = express.json();
simpleCRUDOperations(apiRouter, Group, "group", jsonParser)
simpleCRUDOperations(apiRouter, Room, "room", jsonParser)
simpleCRUDOperations(apiRouter, Subject, "subject", jsonParser)
simpleCRUDOperations(apiRouter, Teacher, "teacher", jsonParser)
apiRouter.use(function (request, response) {
    response.status(404).send({"code": 404, "message": "Object not found"})
});

module.exports = apiRouter

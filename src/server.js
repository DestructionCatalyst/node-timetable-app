const express = require("express");
const sequelize = require("./db").sequelize;
// Temporary
const Appointment = require("./models/appointment").Appointment

const apiRouter = require("./routes/apiRouter")

const app = express();

const port = 8080;
const host = '0.0.0.0';

function log_request(request){
    let now = new Date();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let data = `${hour}:${minutes}:${seconds} ${request.method} ${request.url} ${request.get("user-agent")}`;
    console.log(data);
}

app.use(function(request, response, next){
    log_request(request)
    next();
});

app.use("/api", apiRouter)

app.use(function (req, res, next) {
    res.status(404).send("Page not found")
});

sequelize.sync().then(result => {
    // console.log(result);
}).catch(err => console.log(err));

app.listen(port, host);
console.log(`running on http://${host}:${port}`);

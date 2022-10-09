const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    dialect: "postgres",
    host: "postgres",
    define: {
        timestamps: false
    }
});

module.exports.sequelize = sequelize

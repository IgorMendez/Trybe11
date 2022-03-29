require("dotenv").config();
console.log(process.env.NODE_ENV, "it is being loaded correctly");
const config = {
  development: {
    username: "root",
    password: "",
    database: "",
    host: "localhost",
    port: "3306",
    dialect: "mysql",
    dialectOptions: {
      charset: "utf8mb4",
    },
  },
  production: {
    username: "mysql",
    password: "",
    database: "",
    host: "",
    port: "3306",
    dialect: "mysql",
    dialect: "mysql",
    dialectOptions: {
      charset: "utf8mb4",
    },
  },
};
console.log(config);
module.exports = config;

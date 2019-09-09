//importing knex
const knex = require("knex");

//
const dbEnv = process.env.DB_ENV || "development";

//connecting to knex file
const config = require("../knexfile");

module.exports = knex(config[dbEnv]);

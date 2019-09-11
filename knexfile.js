// Update with your config settings.
module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      //update to location and db name
      filename: "./data/users.db3"
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    },
    //add useNullAsDefault
    useNullAsDefault: true,
    //for cascading foreign keys
    pool: {
      afterCreate: (conn, done) => {
        // runs after a connection is made to the sqlite engine
        conn.run("PRAGMA foreign_keys = ON", done); // turn on FK enforcement
      }
    }
  },
  testing: {
    client: "sqlite3",
    connection: {
      filename: "./data/tests.db3"
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    },
    // I do not think we will need seeds because the testing method we will use truncates beforeEach
    // seeds: {
    //   directory: "./data/seeds"
    // },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, done) => {
        // runs after a connection is made to the sqlite engine
        conn.run("PRAGMA foreign_keys = ON", done); // turn on FK enforcement
      }
    }
  }
};

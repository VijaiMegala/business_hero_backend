require('dotenv').config(); // Load environment variables from .env file

// Rest of your code
module.exports = {
    "development": {
      "username": "postgres",
      "password": "1234",
      "database": "cruddb",
      "host": "127.0.0.1",
      "dialect": "postgres"
    },
    "test": {
      "username": "root",
      "password": null,
      "database": "database_test",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    // "production": {
    //   "username": "postgres",
    //   "password": "1234",
    //   "database": "cruddb",
    //   "host": "127.0.0.1",
    //   "dialect": "postgres"
    // }
    "production": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      }
    }
  }
  }
  
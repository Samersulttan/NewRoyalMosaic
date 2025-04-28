const mongoose = require('mongoose');

const dbConnection = () => {
  return mongoose
    .connect(process.env.DB_URI)
    .then((conn) => {
      console.log(`Database Connected: ${conn.connection.host}`);
    })
    .catch((err) => {
      console.error(`Database Error: ${err}`);
      throw err;
    });
};

module.exports = dbConnection;
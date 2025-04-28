const mongoose = require('mongoose');

const dbConnection = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(process.env.DB_URI)
      .then(conn => {
        console.log(`Database Connected: ${conn.connection.host}`);
        resolve(conn);
      })
      .catch((err) => {
        console.error(`Database Error: ${err}`);
        reject(err);
      });
  });
};

module.exports = dbConnection;
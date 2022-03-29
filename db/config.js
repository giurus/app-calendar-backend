const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CON);
    console.log("Online");
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  dbConnection,
};

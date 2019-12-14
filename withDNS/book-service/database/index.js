const mongoose = require("mongoose");
const config = require('../config')

const connect = async () => {
  const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  let url = config.MONGO_URL_CONNECT;

  await mongoose.connect(url, option);
  console.log("Book database is connected");
};

module.exports = { connect };

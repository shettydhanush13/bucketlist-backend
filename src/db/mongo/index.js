const mongoose = require('mongoose');
const { logger } = require('../../core/logger');
const { mongoConfig } = require("../../config")

module.exports = {
  connect: () => {
    mongoose.connect(mongoConfig.uri, err => { if(err) throw err} );
    const connection = mongoose.connection;
    connection.once("open", () => {
        logger.info("MongoDB database connection established successfully");
    });
  }
};

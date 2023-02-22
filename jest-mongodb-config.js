/* eslint-disable semi */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */

module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      version: "5.0.1",
      skipMD5: true,
    },
    instance: {
      dbName: "jest",
    },
    autoStart: false,
  },
};

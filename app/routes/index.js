console.log("routes generated.");

module.exports = (app) => {
  require("./absolute")(app);
  require("./deeper")(app);
};

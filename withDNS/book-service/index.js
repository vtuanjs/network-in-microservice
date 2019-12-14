const app = require("./app")
const database = require("./database");
const config = require('./config')

database.connect().then(() => {
  app.listen(config.PORT, () => {
    console.log("Book services running at port: " + config.PORT);
  });
});

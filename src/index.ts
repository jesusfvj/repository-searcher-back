import app from "./server";
import Config from "./config/config";
const { dbConnection } = require("./database/config");

dbConnection().then(async function onServerInit() {
  console.log("DB connected");

  app.listen(Config.app.PORT, () => {
    console.log(`Serving on port ${Config.app.PORT}`);
  });
});

/* import app from "./server";
import Config from "./config/config";
import { dbConnection } from "./database/config";

const server = app.listen(Config.app.PORT, () => {
  console.log(`Server listening on port ${Config.app.PORT}`);
});

dbConnection()
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.log(error);
    process.exit(1); // Terminate the application if the database connection fails
  }); */
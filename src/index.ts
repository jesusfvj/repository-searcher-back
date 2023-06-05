import app from "./server";
import Config from "./config/config";
import { dbConnection } from "./database/config";

dbConnection().then(async function onServerInit() {
  console.log("DB connected");

  app.listen(Config.app.PORT, () => {
    console.log(`Serving on port ${Config.app.PORT}`);
  });
});
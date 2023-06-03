import app from "./server";
import Config from "./config/config";

  app.listen(Config.app.PORT, () => {
    console.log(`Serving on port ${Config.app.PORT}`);
});

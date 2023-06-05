import mongoose from "mongoose";
import CONFIG from "../config/config"

const dbConnection = async (): Promise<void> => {
  try {

    await mongoose.connect(CONFIG.db.URI!, {});

    console.log("DB Online");

  } catch (error) {
    console.log(error);
    throw new Error("Could not initialize DB");
  }
};

export { dbConnection };

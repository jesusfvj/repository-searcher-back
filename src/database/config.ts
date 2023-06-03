import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnection = async (): Promise<void> => {
  try {
    /* const mongoUrl = process.env.MONGO_URL; */
    const mongoUrl = "mongodb+srv://jesusvelaro:zuFbm9cyVkJx22pD@cluster0.v1dk2sj.mongodb.net/git-hub-searcher";

    await mongoose.connect(mongoUrl, {});

    console.log("DB Online");

  } catch (error) {
    console.log(error);
    throw new Error("Could not initialize DB");
  }
};

export { dbConnection };

import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONOGO_URL!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MonogoDB connected successfully!!");
    });
    connection.on("error", (err) => {
      console.log("MonogoDB connected error ===> ", err);
      process.exit();
    });
  } catch (error) {
    console.log("error ==>", error);
  }
}

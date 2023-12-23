import * as mongoose from "mongoose";
mongoose.set("strictQuery", true);

export default (async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://murali123:murali123@cluster0.hrs63u2.mongodb.net/"
    );
    console.log("Connection Established Successfully.!!!");
  } catch (error) {
    console.log("Error connecting to database", error);
    process.exit();
  }
})();

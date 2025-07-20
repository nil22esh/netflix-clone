import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database connected Successfully!`);
  } catch (error) {
    console.log(`Error while connecting database: ${error}`);
    process.exit(1);
  }
};

export default dbConnection;

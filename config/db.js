import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected to: ${conn.connection.host}`.green.bold);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;

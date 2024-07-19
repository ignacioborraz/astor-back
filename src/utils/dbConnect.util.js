import { connect } from "mongoose";

async function dbConnect(URI) {
  try {
    await connect(URI);
    console.log("mongo database connected");
  } catch (error) {
    console.log(error);
  }
}

export default dbConnect;

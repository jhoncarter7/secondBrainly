
import mongoose from 'mongoose'
import dotenv from 'dotenv';

dotenv.config({
  path: './.env'
}); 


const DatabaseConnection = async () => {

  try {

    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined");
    }
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`db is conected to ${connectionInstance.connection.host}`)
    mongoose.connection.on("connected", () => {
      console.log("db connected")
    })

  } catch (error) {
    console.log("error while connecting to db", error)
    process.exit(1)
  }

}



export default DatabaseConnection;
import exp from 'constants'
import mongoose from 'mongoose'



const DatabaseConnection = async() => {

  try {
    const connectionInstance = await mongoose.connect('mongodb+srv://heroamerican498:rdc85THRLG6CNwp3@cluster0.4bnc6.mongodb.net/brainly')
   console.log(`db is conected to ${connectionInstance.connection.host}`)
  mongoose.connection.on("connected", ()=> {
    console.log("db connected")
    })  

  } catch (error) {
    console.log("error while connecting to db", error)
    process.exit(1)
  }

}


export default DatabaseConnection;
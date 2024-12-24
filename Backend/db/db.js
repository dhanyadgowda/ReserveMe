import mongoose, { mongo } from'mongoose'

export const dbConnection=()=>{
  mongoose
  .connect(process.env.MONDO_URL,{
    dbName: "Restaurant",
  })
  .then(()=>{
    console.log("Connected to MongoDB")
  })
  .catch((err)=>{
    console.log(`Error connecting to MongoDB ${err}`)
  })
}
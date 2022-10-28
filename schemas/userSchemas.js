import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  _id:String,
  name:String
})
const userModel = mongoose.model('user',userSchema)
export default userModel
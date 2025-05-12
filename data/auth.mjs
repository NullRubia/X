import mongoose from "mongoose";
import { useVirtualId } from "../db/database.mjs";

const userSchema = new mongoose.Schema(
  {
    userid: { type: String, require: true },
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    url: String,
  },
  { versionKey: false }
);

useVirtualId(userSchema);

const User = mongoose.model("User", userSchema);

export async function createUser(user) {
  return new User(user).save().then((data) => data.id);
}

//유저ID 찾기
export async function findByUserid(userid) {
  return User.findOne({ userid });
}

//id 찾기
export async function findByid(id) {
  return User.findById(id);
}

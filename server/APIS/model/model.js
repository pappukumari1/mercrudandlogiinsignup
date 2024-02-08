const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const userSchema = mongoose.Schema({
  file: String,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
});
const authSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const auth = mongoose.model("mernCrudData", authSchema);
const user = mongoose.model("mernCrudDataUser", userSchema);
const postModelData = async (body) => {
  try {
    const data = await user.create(body);
    return { data: data, message: "data added successfully", status: 200 };
  } catch (error) {
    return { error, message: "can not added data", status: 400 };
  }
};
const getModelData = async () => {
  try {
    const data = await user.find();
    return { data: data, message: "data get succesfully", status: 200 };
  } catch (error) {
    return { error, message: "can not get data", status: 400 };
  }
};
const putModelData = async (id, body) => {
  try {
    console.log("id==", id + "  " + "update==", body);
    const data = await user.findByIdAndUpdate(id, { $set: body });
    return { data: data, message: "data updated succesfully", status: 200 };
  } catch (error) {
    return { error, message: "can not update data", status: 400 };
  }
};
const deleteModelData = async (id) => {
  try {
    console.log("delete id===", id);
    const data = await user.findByIdAndDelete(id);
    return { data: data, message: "delete by id succesfully", status: 200 };
  } catch (error) {
    return { error, message: "can not delete by id", status: 400 };
  }
};
const signUpModelData = async (body) => {
  try {
    const { name, email, password } = body;
    const salt = bcrypt.genSaltSync(10);
    console.log("password==", password);
    const hashPass = bcrypt.hashSync(password, salt);
    console.log("hashpassword==", hashPass);

    const bodyData = { name, email, password: hashPass };
    const data = await auth.create(bodyData);
    console.log("signup===", data);
    return { data: "data", message: "User register succesfully", status: 200 };
  } catch (error) {
    return { error, message: "User can't register", status: 400 };
  }
};
const loginModelData = async (body) => {
  try {
    console.log("body===", body);

    if (body.email && body.password) {
      const findData = await auth.findOne({ email: body.email });
      console.log("findData===", findData);
      const { password, _id, email } = findData;
      if (!findData) {
        return { message: "email can not exist" };
      } else {
        console.log("l=====");
        // const hash = bcrypt.compareSync(body.password, findData.password);
        try {
          console.log("ooo====");
          console.log("body.password==", body.password);
          console.log("password==", password);

          var hash = bcrypt.compareSync(body.password, password);
          console.log("hash===", hash);
        } catch (error) {
          console.log("ii---", error);
          return error;
        }
        console.log("p-------");
        console.log("hash===", hash);
        if (hash) {
          const { name, email, password } = findData;
          const token = jwt.sign({ userData: _id }, process.env.SECURET_KEY);
          const data = { name, email, password };
          data.token = token;
          return { data, message: "User login succesfully", status: 200 };
        } else {
          return { message: "password didn't exist", status: 200 };
        }
      }
    } else {
      return { message: "email and password  both are required" };
    }
  } catch (error) {
    return { error, message: "User can not login", status: 400 };
  }
};
module.exports = {
  postModelData,
  getModelData,
  putModelData,
  deleteModelData,
  signUpModelData,
  loginModelData,
};

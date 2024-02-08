const express=require("express");
const {postControllerData, getControllerData, putControllerData, deleteControllerData, signupController, loginController} = require("../Controller/controller");
const imagesFileUpload = require("../midlleval/midelleval");
const route=express.Router();
route.use("/fileImage",express.static("file"))
route.post("/post",imagesFileUpload.single("pdfFile"), postControllerData);
route.get("/get",getControllerData);
route.put("/put",putControllerData);
route.post("/signup",signupController);
route.post("/login",loginController)
route.delete("/delete",deleteControllerData);
module.exports=route;
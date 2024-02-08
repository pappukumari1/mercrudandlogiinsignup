const {postModelData, getModelData, putModelData, deleteModelData, signUpModelData, loginModelData} = require("../model/model");

const postControllerData=async(req,res)=>{
   const file= req?.file?.path;
   const body={...req.body,file}
    console.log("req.body===",req.body);
const data=await postModelData(body);
res.send(data);
}
const getControllerData=async(req,res)=>{
    const data=await getModelData(req.body);
    res.send(data);
}
const putControllerData=async(req,res)=>{
    const data=await putModelData(req.query.id,req.body);
    res.send(data);
}
const deleteControllerData=async(req,res)=>{
    console.log("req?.query?.id===",req?.query?.id);
    const data=await deleteModelData(req?.query?.id);
    res.send(data);
}
const signupController=async(req,res)=>{
    const data=await signUpModelData(req.body);
    res.send(data);
}
const loginController=async(req,res)=>{
const data=await loginModelData(req.body);
res.send(data)
}
module.exports={postControllerData,getControllerData,putControllerData,deleteControllerData,signupController,loginController};
const multer=require("multer");
const fileUpload=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./file")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const imagesFileUpload=multer({
    storage:fileUpload
}
    
)
module.exports=imagesFileUpload;
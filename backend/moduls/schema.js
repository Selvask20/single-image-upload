const mongoose=require('mongoose')
const multerschema= mongoose.Schema({
   originalname:{
         type:String,
         required:true
        }  ,  
    mimetype:{
         type:String,
         required:true 
        },      
    filename:{
        type:String,
        required:true 
    },
   path:{
        type:String,
        required:true 
    },    
    size:{
        type:Number,
        required:true
     }     
})
module.exports=mongoose.model('image',multerschema)
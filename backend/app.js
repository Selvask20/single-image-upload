var express=require('express')
var app=express()
var multer=require('multer')
var path=require('path')
var schema=require('./moduls/schema')
var mongoose=require("mongoose")
var url="mongodb://localhost:27017/images"
mongoose.set('strictQuery',true)
app.use(express.json())
var cors=require('cors')
app.use(cors())
var fs=require("fs")
app.use(express.static(path.join(__dirname,'images')))
mongoose.connect(url,(err)=>{
     
if(err){
    console.log(err);
    console.log("error");
}else{
    console.log("successfully");
}})
const storage=multer.diskStorage({
    destination:'./images',
    filename:(req,file,cb)=>{
    cb(null,Date.now()+"_"+path.extname(file.originalname))
    }
})
const upload=multer({storage:storage})
app.post('/',upload.single('file'),async(req,res)=>{
    // console.log(req.file);
    const multers= await new schema({
        originalname:req.file.originalname,
        mimetype:req.file.mimetype,
        filename:req.file.filename,
        path:req.file.path,
        size:req.file.size
    })
     multers.save();
    res.json("upload")
});
app.post('/:id',upload.single('file'),async(req,res)=>{
    const multers=await schema.findById(req.params.id)
        await fs.unlink(multers.path,(err=>{
            if(err){
                console.log("error");
            }
            else{
                console.log("removed succefully")

            } 
        }));
    const mul=await  schema.findByIdAndUpdate(req.params.id)
        mul.originalname=req.file.originalname;
        mul.mimetype=req.file.mimetype;
        mul.filename=req.file.filename;
        mul.path=req.file.path;
        mul.size=req.file.size;
    
     mul.save();
    res.json("upload")
})
app.delete('/:id',async(req,res)=>{
    const multers=await schema.findById(req.params.id)
    await fs.unlink(multers.path,(err=>{
        if(err){
            console.log("error");
        }
        else{
            console.log("file deleted");
        }
    }))
    await schema.findByIdAndDelete(req.params.id)
     res.json("deleted")
})

app.get('/',async(req,res)=>{
    const multers=await schema.find();
    res.json(multers)
})
app.get('/:id',async(req,res)=>{
    const multers=await schema.findById(req.params.id);
    res.json(multers)
})


// app.get('/',(req,res)=>{
//     res.send('happy')
// })
app.listen(7000,()=>{
    console.log('server start');
})
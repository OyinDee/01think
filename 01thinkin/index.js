const express= require('express') //importing express and putting into variable/constant express
const app = express();
const http = require('http');
const server = http.createServer(app);
const bodyParser=require('body-parser')
const mongoose = require("mongoose")
const path = require("path");
const { MongoClient, ServerApiVersion } = require('mongodb')
const bcryptjs= require('bcryptjs')
const jwt = require('jsonwebtoken')
const cors = require('cors')
app.use(cors())
const Server = require("socket.io");
require('dotenv').config()
const formidable = require('formidable')
const cloudinary = require('cloudinary')
app.use(express.static(__dirname+'/public'))

app.use(express.static(path.resolve(__dirname, "./build")));
app.use(express.static(__dirname+'/build/static'))
const userSchema= new mongoose.Schema(
    {
        fullname:String,
        username:String,
        password:String,
        zeroorone:String,
        email:String
        
    }
)
const feedbackSchema= new mongoose.Schema(
    {
        fullname:String,
        email:String,
        feedback:String
    }
)
const userDeletedPostSchema = new mongoose.Schema({
    username: String,
    postContent: String,
    time: String,
    date: String
})
const userApprovedPostSchema = new mongoose.Schema({
    username: String,
    postContent: String,
    time: String,
    date: String
})
const userPostSchema = new mongoose.Schema({
    username: String,
    postContent: String,
    time: String,
    date: String
})
const userModel= mongoose.model("user", userSchema)
const userPostModel = mongoose.model("prepost", userPostSchema)
const userApprovedPostModel = mongoose.model("post", userApprovedPostSchema)
const userDeletedPostModel = mongoose.model("deletedpost", userDeletedPostSchema)
const feedbackModel = mongoose.model("feedback", feedbackSchema)

app.use(bodyParser.json())
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET 
});
const url=process.env.URL
app.use(bodyParser.urlencoded({extended: true}))

mongoose.connect(url, (err)=>{
    if (err) {
        console.log(err.message);
        console.log("Error");
    }
    else{
        console.log("mongoose don connect sha");
    }
})
const PORT= process.env.PORT
var connection= app.listen(PORT, ()=>{console.log(`app is running on port ${PORT}`)})
app.get('/',(request,response)=>{
    response.sendFile(path.resolve(__dirname, './build', 'index.html'))
})
app.post('/signup',(request,response)=>{
    const newUserForm=request.body
    const myPlaintextPassword = newUserForm.password
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(myPlaintextPassword, salt);
    const newForm= {
        fullname: newUserForm.fullname,
        username:newUserForm.username,
        email:newUserForm.email,                
        zeroorone:newUserForm.zeroorone,
        password:hash
    }
    console.log(newForm)
    userModel.find({email: newForm.email},(err,result)=>{
        if(result.length>0){
            console.log("Email exists")
            response.send({message:`Email already exists.`, text: 'no'})
        }
        else{
            userModel.find({username: newForm.username},(err,result)=>{
                if(result.length>0){
                    console.log("Username exists")
                    response.send({message:`Username already exists.`, text: 'no'})
                }
                else{
                    response.send({message: 'Success', text:'yes'})
                    let formm = new userModel(newForm)    
                    formm.save()
                }
            })                                    
        }
                        })
                    })
                    app.post('/login',(request, response)=>{
                        const loginform= request.body
                        const newLogin={
                            username:loginform.username,
                            password:loginform.password
                        }
                        
                        const usernameee = loginform.username
                        let found= userModel.find({username: usernameee},(err,result)=>{
                            if (err) {
                                console.log(err.message)
                            }
                            else if(result.length==0){
                                console.log("Nothing")
                                response.send({message: `Dear ${usernameee}, you do not have an account here...`,result})
                                
                            }
                            else if(result){
                                const zeroorone=(result[0].zeroorone)
                                const username=(result[0].username)
                                const passw=result[0].password;
                                const myPlaintextPassword = newLogin.password;
                                bcryptjs.hash(myPlaintextPassword, 10)
                                .then((hash) => {
                                    return bcryptjs.compare(myPlaintextPassword, passw)
                                }).then((result) => {
                                    if(result==true){
                                        jwt.sign({username},  process.env.JWT_SECRET, function(err, token) {
                                            console.log(token);
                                            response.send({message:"Your login is successful!",result,token,username,zeroorone})
                                        });
                                        
                        }
                        else{
                            response.send({message:"I don't know what's up, but your password is definitely wrong!",result})
                        }
                    })
                    // response.send({result})
                }
                else{
                    response.send({message:"I don't know what's up",result})
                    // response.send({result})
                }
                
                
            })
        })
        app.get('/dashcheck',(request,response)=>{
            const auth= request.headers.authorization
            const token = auth.split(' ')[1]
            console.log(token)
            jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
                if(err){
                    console.log(`jwt could not be decoded`)
                    response.send({message:err.message})
                }  
                else{
                    console.log(decoded.username)
                    response.send({message:'verification successful', username:decoded.username})
                }
            })
        })
        app.post('/adminapproval', (request,response)=>{
            console.log(request.body.time)
            response.send(request.body)
            const newPost={
                username: request.body.username,
                postContent: request.body.idea,
                time: request.body.time,
                date: request.body.fullDate
            }
            console.log(request.body)
            let sendToAdmin=new userPostModel(newPost)
            console.log(sendToAdmin)
            sendToAdmin.save()
        })
        app.get('/admincheck', (request,response)=>{
            let found= userPostModel.find((err,result)=>{
                response.send(result)
            })
        })
        app.post('/approvepost', (request,response)=>{
            const id=request.body.id    
            userPostModel.find({_id: id},(err,result)=>{
                console.log(request.body)
        const post=result[0]
        const newPost={
            username: post.username,
            postContent: post.postContent,
            time: post.time,
            date: post.date
        }
        // console.log(newPost)
        let sendToNewsfeed=new userApprovedPostModel(newPost)
        // console.log(sendToNewsfeed)
        sendToNewsfeed.save()
        userPostModel.deleteOne({_id:post._id},(err,result)=>{
        })
    })
})
app.post('/deletepost', (request,response)=>{
    const id=request.body.id    
    userPostModel.find({_id: id},(err,result)=>{
        // console.log(result)
        const post=result[0]
        const newPost={
            username: post.username,
            postContent: post.postContent,
            time: post.time,
            date: post.date
        }
        // console.log(newPost)
        let sendToDelposts=new userDeletedPostModel(newPost)
        // console.log(sendToNewsfeed)
        sendToDelposts.save()
        userPostModel.deleteOne({_id:post._id},(err,result)=>{
        })
    })
})            
app.get('/userscheck', (request,response)=>{
    let found= userApprovedPostModel.find((err,result)=>{
        response.send(result)
    })
    app.post('/getUserType',(request,response)=>{
        console.log(request.body)
        const username=request.body.username
        let found= userModel.find({username: username},(err,result)=>{
            response.send(result[0].zeroorone)
        })                
    })
})
const io = Server(connection, {cors:{options:'*'}})
    io.on('connection', (socket) => {
        console.log("Someone joined")
        socket.on('disconnect', (socket) => {
            console.log("Someone left")
        });
        socket.on('messageInput',(newMessage)=>{
            console.log(newMessage)
            io.emit('messageOutput',(newMessage))
        })
    });
    
    app.post('/chat', (request,response)=>{
        const username=request.body.username
    console.log(`${username} entered the chat`)
})


app.post('/feedback', (request,response)=>{
    const newFeedback={
        fullname: request.body.fullname,
        email: request.body.email,
        feedback: request.body.feedback       
    }
    console.log(request.body)
    let theFeedback=new feedbackModel(newFeedback)
    console.log(theFeedback)
    theFeedback.save()
})
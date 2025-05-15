const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const _ = require('lodash')
const mongoose = require('mongoose')

const homestattingcontent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"

const aboutcontent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"

const contactcontent = " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"

const app = express();

mongoose.connect("mongodb+srv://admin-pawan:Test123@cluster0.w4aix.mongodb.net/blogDB",{useNewUrlParser:true ,useUnifiedTopology: true});

const postSchema = {
    title : String,
    content : String
}

const Post = mongoose.model('Post',postSchema);


// const BlogPosts = [];

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));



app.get('/', function(req, res){
    Post.find({},function (err,posts){
        res.render('home',{
            con : homestattingcontent,
            BP : posts
        })
    })
    
});

app.get('/about', function(req, res){
    res.render('about',{con: aboutcontent});
});

app.get('/contact', function(req, res){
    res.render('contact',{con:contactcontent});
});
app.get('/compose',function(req, res){
    res.render('compose')
});
app.post('/compose',function(req, res){
    
    const post =new Post({
        title : req.body.postTitle,
        content : req.body.postBody
    });
    post.save();
    
    res.redirect('/')

});
app.get('/posts/:postId', function(req, res){
    const requestedPostId = req.params.postId;
    // const reqTitle = _.lowerCase(req.params.postNames);
    Post.findOne({_id : requestedPostId},function(err,post){
        res.render('post',{
            title : post.title,
            content : post.content
        });
    });
    
});
























let port = process.env.PORT;
if(port === null || port === ""){
    port = 3000;
}



app.listen(port, function(){
    console.log("Server has started successfully");
})

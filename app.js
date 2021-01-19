
const express=require("express");
const bodyParser=require("body-parser");
const request= require("request");
const https=require("https");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req,res){

    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){

    const Fname=req.body.firstname;
    const Lname=req.body.lastname;
    const email=req.body.email;

   var data={
       members:[
           {
               email_address:email,
               status: "subscribed",
               merge_fields:{
                   FNAME:Fname,
                   LNAME:Lname
               }
           }
       ]
   };

var jsonData= JSON.stringify(data);

const url="https://us7.api.mailchimp.com/3.0/lists/f9c09b7b2a";
const options={
    method:"POST",
    auth:"pankaj:a7dde19f6cc10938585c586360fc25e3-us7"
}
    const request=https.request(url,options,function(response){

          if(response.statusCode===200)
          {res.sendFile(__dirname+"/success.html");}
          else
          {res.sendFile(__dirname+"/failure.html");}

        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    
    
    request.write(jsonData);
    request.end();
});

app.post("/failure",function(req,res){
res.redirect("/");
});






app.listen(process.env.PORT || 3000,function(){
console.log("Server is running on port 3000");
});


//apli key
// a7dde19f6cc10938585c586360fc25e3-us7
// f9c09b7b2a
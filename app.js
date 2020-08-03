const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const date = require( __dirname + "/date.js")
// <% for(var i=0;i<newListItems.length;i++)%> 
// <%{%>
//     <li><%= newListItems[i] %></li>
// <%}%> 

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

var items = [];
var item = "";

app.get("/",function(req,res){
    var day = date.getDate();
    res.render("list",{ 
        DAY : day,
        newListItems : items
    });
});

app.post("/",function(req,res){
    item = req.body.newItem;
    items.push(item);
    res.redirect("/");
});

app.listen(3000,function(){
    console.log("server running on port 3000");
});
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const date = require( __dirname + "/date.js");
const mongoose = require("mongoose");

//using ejs templating
app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended : true}));


//the line below will display the ejs template with css as it is set to static
app.use(express.static("public"));

//creating database named todolistDB if not exist
mongoose.connect("mongodb://localhost:27017/todolistDB",{ useNewUrlParser: true });

//creating schema of the database
const Items_schema = {
    name : String
};

//creating a collecton of items named Item (table)
const Item = mongoose.model("Item",Items_schema);


//creating default items
const item1 = new Item({name : "Welcome"});
const item2 = new Item({name : "Hit + button to add items"});
const item3 = new Item({name : "<---Hit this checkbox to delete"});
const defaultarr = [item1,item2,item3];



//the user gets this,renders this
app.get("/",function(req,res){
    var day = date.getDate();

    Item.find({},function(err,foundItems){
        if(foundItems.length == 0)
        {
            //inserting default items
            Item.insertMany(defaultarr,function(err){
                if(err) {console.log("there was an error :" + err);}
                else {console.log("Successfully saved default items");}
            });
            res.redirect("/");
        }
        else
        {
            res.render("list",{ 
                DAY : day,
                newListItems : foundItems
            });
        }
    });
});

//user sends send this
app.post("/",function(req,res){
    itemName = req.body.newItem;//from form
    const item = new Item({name : itemName});
    item.save();
    res.redirect("/");
});

//delete fnction || user post herer
app.post("/delete",function(req,res){
    const checkedItemid = req.body.checkbox;
    console.log("element id to delete:"+checkedItemid);

    Item.findOneAndRemove({_id : checkedItemid},function(err){
        if(!err){
            console.log("deleted id:"+checkedItem);
            res.redirect("/");  
        }  
    });
});

app.listen(3000,function(){
    console.log("server running on port 3000");
});
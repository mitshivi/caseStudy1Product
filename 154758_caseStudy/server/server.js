var express = require('express');
var app = express();
var parse =require('body-parser');
var cors = require('cors');
var fs =require('fs');
var MongoClient=require('mongodb').MongoClient;


function add()
{
    var product=JSON.parse(fs.readFileSync('product.json'));
    MongoClient.connect('mongodb://localhost:27017/product',function(err,dbvar){
        if(err) throw err;
        var col1=dbvar.db('product');
        col1.collection('list').insertMany(product,true,function(err,value){
            if (err) throw err;
            console.log("Data is added successfully");
            dbvar.close();
        });
        dbvar.close();
    });
}

add();

//getting the data from the database
app.get('/productshow',(req,res)=>{
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
  MongoClient.connect("mongodb://localhost:27017/product",
  function(err,dbvar){
      var col1=dbvar.db('product');
      var c=col1.collection('list').find().toArray(function(err,result){
          if(err) throw err;
          res.send(result);
          dbvar.close();
      });
      dbvar.close();
  });
});
app.use(parse.json());

//sending the data to the mongodb
app.post('/productsend',(req,res)=>{
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
  console.log(req.body);
  MongoClient.connect("mongodb://localhost:27017/product",function(err,dbvar){
      if(err) throw err
  var col1=dbvar.db('product');
  var c=col1.collection('list').insertOne(req.body,function(err){
      if (err) throw err;
      console.log("1 product is successfully added");
  });
  })
})


//deleting the data from the database
app.post('/deletedata',(req,res)=>{
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
  console.log(req.body);
  MongoClient.connect("mongodb://localhost:27017/product",function(err,dbvar){
      if (err) throw err;
      var col1=dbvar.db('product');
      col1.collection('list').deleteOne(req.body,function(err){
          if(err) throw err;
          else{
          console.log("1 data deleted successfully");
          dbvar.close();
          }
      });
      dbvar.close();
  });
});

//updating data in the database
app.post('/updatedata',(req,res)=>{
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
  console.log(req.body);
 MongoClient.connect("mongodb://localhost:27017/product",function(err,dbvar){
      if(err) throw err;
      var col1=dbvar.db('product');
      col1.collection('list').updateOne(req.body[1],{$set:req.body[0]},function(err,val){
          if(err) throw err
          else{
          res.send(val);
          console.log("updation successfull");
          }
      })
  })
})

//starting the server
app.use(cors()).listen(1234,()=>{
    console.log('express started');
})

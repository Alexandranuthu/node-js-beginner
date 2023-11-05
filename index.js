const express = require("express");
const routes = require('./routes/api');
const route = require('./routes/Userroute');
  
  require('dotenv').config();
require('./helpers/init_mongodb');



const app = express ();
app.use(express.json())
app.use(routes);
app.use(route);

//handling 404 error
app.use((req, res, next)=>{
  const err = new Error("Not found");
  err.status = 404
  next(err)
})

//Error Handler
app.use((err, req, res, next)=>{
  res.status(err.status || 500)
  res.send({
    error:{
      status: err.status || 500,
      message: err.message
    }

  })
})



app.listen(process.env.PORT || 4000, function(){
    console.log("now listening for request on: http://localhost:4000");
});



const express = require('express');
const app = express();

const PORT = 3000;
let count=0;
setTimeout(()=>{
  count=0;
},60000);

function requestCounter(req, res, next) {
  count++;
  next();
}

function ratelimiter(req, res, next){
  if(count>50){
    res.send("You have reached the maximum number of request");
  }
  else{
    next();
  }
};

app.get('/',requestCounter ,ratelimiter , (req, res) => {
  res.send(`The count is ${count}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

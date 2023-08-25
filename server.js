const express = require('express');
const appRoute = require('./routes/route.js')

const app = express();
const PORT = 5000;

app.use(express.json());

app.use('/api' , appRoute);


app.listen(PORT , ()=>{
  console.log(`running in http://localhost:${PORT} port ` );
})
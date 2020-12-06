//#region Config Setup
//Create a .env file in the  relative path of index.js & access config using process.env.ConfigKey

require('dotenv/config')

//#endregion

const express = require('express')
const cors = require('cors')
//const fs = require('fs');
const app = express()
app.disable("x-powered-by");
const port = process.env.port || 3000
const dir=process.env.dir || "public"
var serveIndex = require('serve-index');


app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
  res.send('Server is up and running...')
})
console.log(`starting server at http://localhost:${port}/`)

app.use(express.static(__dirname + "/"))

app.use('/ftp', serveIndex(dir + '/'));
//app.use('/static', express.static('public'));

app.get('/ftp/*', function(req, res){
  var resource=req.url.substr(4);
  const file = `${process.env.dir || "public"}${resource}`;
  res.download(file); // Set disposition and send it.
});
// Listen
app.listen(port)


// function getFileNames(dir) {

//   const testFolder = 'C:\\Softwares';
//   fs.readdir(testFolder, (err, files) => {
//     files.forEach(file => {
//       console.log(file);
//     });
//   });

// }
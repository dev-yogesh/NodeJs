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
const dir = process.env.dir || "public"
var serveIndex = require('serve-index');


app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
  res.send(`Server is up and running. <br> <br><a href="${ req.protocol + '://' + req.get('host') + req.originalUrl+"ftp"}">Click here to access ftp</a>`)
})
console.log(`starting server at http://localhost:${port}/`)

app.use(express.static(__dirname + "/"))

app.use('/ftp', serveIndex(dir + '/'));

app.get('/ftp/*', function (req, res) {
  if (req.url && req.url.length > 4) {
    // decode the url  in case of spaces
    res.download(`${process.env.dir || "public"}${decodeURIComponent(req.url.substr(4))}`)
  }
});

// Listen
app.listen(port)


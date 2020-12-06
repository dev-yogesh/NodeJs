//#region config
//Create a .env file in the  relative path of index.js & access config using process.env.ConfigKey

require('dotenv/config')

const port = process.env.port || 3000
const dir = process.env.dir || "public"
//#endregion


//#region imports
const express = require('express')
const serveIndex = require('serve-index');
const cors = require('cors')
//#endregion

//#region app def
const app = express() 
app.disable("x-powered-by") //Recovering fingerprints from web application technologies Vulnerability 
app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
//#endregion


app.get('/', (req, res) => {
  res.send(`Server is up and running. <br> <br><a href="${ req.protocol + '://' + req.get('host') + req.originalUrl+"ftp"}">Click here to access ftp</a>`)
})

app.use('/ftp', serveIndex(dir + '/'));


app.get('/ftp/*', function (req, res) {
  if (req.url && req.url.length > 4) {
    // decode the url  in case of spaces
    res.download(`${process.env.dir || "public"}${decodeURIComponent(req.url.substr(4))}`)
  }
});


// Listen
console.log(`starting server at http://localhost:${port}/`)
app.listen(port)


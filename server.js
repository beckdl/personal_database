// Get dependencies
var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;

// import the routing file to handle the default (index) route
var index = require('./server/routes/app');
var notesRoute = require('./server/routes/notes');
var filesRoute = require('./server/routes/files');

// ... ADD CODE TO IMPORT YOUR ROUTING FILES HERE ... 

var app = express(); // create an instance of express

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
    try {
        await client.connect();
        await client.db("pd").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (e) {
        console.error(e);
    }
}

run().catch(console.dir);

mongoose.connect(uri, { dbName: 'pd' })
  .then(() => {
    console.log('Connected to MongoDB via Mongoose');
  })
  .catch((error) => {
    console.error('Mongoose connection error:', error);
  });

//icefire242424_db_user
//RM8Jxvh3PEHLJSX6
//mongodb+srv://icefire242424_db_user:RM8Jxvh3PEHLJSX6@cluster0.xhnnh26.mongodb.net/

// Tell express to use the following parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(logger('dev')); // Tell express to use the Morgan logger

// Add support for CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

// Tell express to use the specified director as the
// root directory for your web site
// serve the browser build output
app.use(express.static(path.join(__dirname, 'dist/personal_database/browser')));

// Tell express to map the default route ('/') to the index route
app.use('/', index);
app.use('/notes', notesRoute);
app.use('/files', filesRoute);

// ... ADD YOUR CODE TO MAP YOUR URL'S TO ROUTING FILES HERE ...

// Tell express to map all other non-defined routes back to the index page
app.use(function(req, res, next) {
    res.sendFile(path.join(__dirname, 'dist/personal_database/browser/index.html'));
});

// Define the port address and tell express to use this port
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Tell the server to start listening on the provided port
server.listen(port, function() {
  console.log('API running on localhost: ' + port)
});

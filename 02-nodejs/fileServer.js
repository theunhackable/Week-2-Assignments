/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module

  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files

  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt

    - For any other route not defined in the server return 404

    Testing the server - run `npm run test-fileServer` command in terminal
 */
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

function getFiles(directoryPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (error, files) => {
      if (error) {
        reject(error);
      } else {
        resolve(files);
      }
    });
  });
}

function readFile(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile('./files/' + fileName, 'utf8', (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}


app.get("/files", (req, res) => {
  // printall files in the files folder
  getFiles('files')
  .then( files=> {
    return res.status(200).json(files);
  })
  .catch( err => {
    return res.status(500).send('Route not found');
  })
  
});

app.get("/file/:filename", (req, res) => {
  // return contents of file
  console.log(req.params.filename);
  readFile(req.params.filename)
  .then( data =>{
    return res.status(200).send(data);
  })
  .catch( err => {
    return res.status(404).send("File not found");
  })
});

app.get('*', (req, res) => {
  res.status(404).send("Route not found");
});

module.exports = app;

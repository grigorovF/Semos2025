const { error } = require("console");
const fs = require ("fs");
const { resolve } = require("path");
const { features } = require("process");

exports.fileRead = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

exports.fileWrite = (filename, content) => {
  return new Promise((resolve, fail) => {
    fs.writeFile(filename, content, "utf-8", (error) => {
      if (error) {
        fail(error);
      } else {
        resolve("File successfully written");
      }
    });
  });
};

exports.fileDelete = (fileName) => {
    return new Promise((resolve, fail) =>{
        fs.unlink(fileName, (error) => {
            if (error) 
                fail(error);
            else
                resolve("Deleted");
        });
    });
}
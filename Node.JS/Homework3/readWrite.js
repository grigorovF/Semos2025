const fs = require('fs');

//readfile
exports.fileRead = (filename) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, "utf-8", (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
};


//writeFile
exports.fileWrite = (filename, data) => {
    return new Promise ((success, fail) => {
        fs.writeFile(filename, data, (error) => {
            if (error)
                return fail(error);
            return success;
        }); 
    });
};


//deleteFile
exports.file = (filename) => {
    return new Promise((resolve, reject) => {
        fs.unlink(filename, (error) => {
            if (error)
                return reject(error);
        return resolve();
        });
    });
}
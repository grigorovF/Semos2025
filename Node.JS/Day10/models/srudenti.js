const DATA_SOURCE = `${__dirname}/../`

exports.fileRead = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fDATA_SOURCE, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

exports.fileWrite = (data) => {
  return new Promise((resolve, fail) => {
    fs.writeFile(DATA_SOURCE, data, (error) => {
      if (error) {
        fail(error);
      } else {
        resolve("File successfully written");
      }
    });
  });
};

const list = async() => {
    const file = await this.fileRead();
    const fileData = JSON.parse(file);
    return fileData;
};

const add = async (data) => {
    const file = await this.fileRead();
    const fileData = JSON.parse(file);
    const jsonData = JSON.stringify(fileData);
    fileData.push(jsonData);
    await fileWrite();
};

const remove = async (i) => {
    i = Number(i);
    const file = await this.fileRead();
    const fileData = JSON.parse(file);

    const newFilterDara = fileData.filter((_, index)=> index !== i);
    await writeFile(JSON.stringify(newFilterDara));
}


module.exports= {
    add, list, remove
}
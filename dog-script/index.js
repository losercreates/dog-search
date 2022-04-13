const axios = require("axios");
var mongo = require("mongodb");
const fs = require("fs");
const path = require("path");
var MongoClient = mongo.MongoClient;

const filePath = path.resolve(__dirname, "./description.json");

fs.readFile(filePath, (err, data) => {
  if (err) {
    console.log("Something went wrong");
  } else {
    description = JSON.parse(data);
  }
});

var master = new Object();
var obj = new Object();
const createfile = async () => {
  var mid = 1;
  var url = "mongodb://localhost:27017/";
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("dogdb");
    dbo.listCollections({ name: "doglist" }).next(function (err, collinfo) {
      if (collinfo) {
        dbo.collection("doglist").drop(function (err, delOK) {
          if (err) throw err;
          if (delOK) console.log("Collection deleted");
          db.close();
        });
      } else {
        db.close();
      }
    });
  });
  let response = await axios.get("https://dog.ceo/api/breeds/list/all");
  for (breed of Object.keys(response.data.message)) {
    master[`${breed}`] = new Object();
    master[`${breed}`].breed = `${breed}`;
    master[`${breed}`].subbreed = new Array();
    if (response.data.message[`${breed}`].length !== 0) {
      for (i = 0; i < response.data.message[`${breed}`].length; i++) {
        master[`${breed}`]["subbreed"][i] = new Object();
        master[`${breed}`]["subbreed"][i]["subbreed name"] =
          response.data.message[`${breed}`][i];
        master[`${breed}`]["subbreed"][i]["description"] =
          description[`${breed}`][`${response.data.message[`${breed}`][i]}`];
        let resp = await axios.get(
          `https://dog.ceo/api/breed/${breed}/${
            response.data.message[`${breed}`][i]
          }/images`
        );
        master[`${breed}`]["subbreed"][i].images = [...resp.data.message];
        obj._id = mid;
        obj.breed = `${breed}`;
        obj.name = `${response.data.message[`${breed}`][i]} ${breed}`;
        obj.subbreed = response.data.message[`${breed}`][i];
        obj.description =
          description[`${breed}`][`${response.data.message[`${breed}`][i]}`];
        obj.images = [...resp.data.message];
        var url = "mongodb://localhost:27017/";
        MongoClient.connect(url, function (err, db) {
          if (err) throw err;
          var dbo = db.db("dogdb");
          dbo.collection("doglist").insertOne(obj, function (err, res) {
            if (err) throw err;
            db.close();
          });
        });
        mid += 1;
      }
    } else {
      master[`${breed}`].description = description[`${breed}`];
      let res = await axios.get(`https://dog.ceo/api/breed/${breed}/images`);
      master[`${breed}`].images = [...res.data.message];
      obj._id = mid;
      obj.breed = `${breed}`;
      obj.subbreed = "";
      obj.description = description[`${breed}`];
      obj.images = [...res.data.message];
      obj.name = `${breed}`;
      var url = "mongodb://localhost:27017/";
      MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("dogdb");
        dbo.collection("doglist").insertOne(obj, function (err, res) {
          if (err) throw err;
          db.close();
        });
      });
      mid += 1;
    }
  }
  var jsonData = JSON.stringify(master, null, 4);
  fs.writeFileSync("user.json", jsonData, (err) => {
    if (err) {
      throw err;
    }
  });
};

createfile();

const express = require("express");
const fetch = require("node-fetch");
const path = require("path");
const { URLSearchParams } = require("url");
const {allBins, itemList}  = require("./fixtures");
const labelDetection = require("./vision.js");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

//can change to .array if want to upload a set of images
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("objectImage");

function checkFileType(file, cb) {
  const fileTypes = /jpeg|jpg|png/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);
  if (mimeType && extName) {
    return cb(null, true);
  } else {
    return cb("Error: image type mismatch", false);
  }
}

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/api/date", (req, res) => {
  res.json(Date());
});

app.post("/api/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.json({
        msg: err,
        state: false,
      });
    } else {
      if (req.file === undefined) {
        res.json({
          msg: "Error: no file selected",
          state: false,
        });
      } else {
        res.json({
          path: req.file.path,
          msg: "success, image has been uploaded",
          state: true,
        });
      }
    }
  });
});

app.get("/api/imageDetect", async (req, res) => {
  const results = await labelDetection(req.query.path);
  const filtered = results.filter((result)=> (
    itemList.some(key=> {
      if(result.name.toLowerCase().includes(key)){
        result.name = key;
        return true;
      }
    })))

  res.json(filtered);
});

app.delete("/api/imageDelete", (req, res) => {
  fs.unlink(req.query.path, (err) => {
    if (err) {
      res.json({
        msg: err,
        state: false,
      });
    } else {
      res.json({
        msg: "file has been removed",
        state: true,
      });
    }
  });
});

app.post("/api/packit4meWrapper", async (req, res) => {
  let returnValue = "Could not find a container that would fit all items";
  const allBoxes = req.body;
  const CONSTRAINT = 0;
  const WEIGHT = 0;

  let itemString = "";
  let binString = "";
  let id = 0;
  const idToBoxType = {};

  //item schema -> id:constraints:weight:HxWxL
  allBoxes.forEach((box) => {
    for (i = 0; i < box.count; i++) {
      idToBoxType[id] = box.id;
      itemString += `${id}:${CONSTRAINT}:${WEIGHT}:${box.h}x${box.w}x${box.l},`;
      id += 1;
      // map uuid for API to id for boxType
    }
  });
  itemString = itemString.slice(0, -1);

  let apiCalledTimes = 1;
  for (let i = 0; i < allBins.length; i++) {
    const bin = allBins[i];
    // bin schema -> id:weight_limit:HxWxL
    binString = `0:1:${bin.h}x${bin.w}x${bin.l}`;

    const params = new URLSearchParams();
    params.append("bins", binString);
    params.append("items", itemString);
    params.append("binId", "0");
    console.log(params);

    let rawResult = await fetch("http://www.packit4me.com/api/call/raw", {
      method: "POST",
      body: params,
    });
    let result = await rawResult.json();
    result[0].items.forEach((item) => (item.boxTypeId = idToBoxType[item.id]));
    apiCalledTimes += 1;

    if (result[0].items.length === id) {
      console.log(`API CALLED ${apiCalledTimes} TIMES`);
      res.json({ result: result, binInfo: bin });
      break;
    }
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "../client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);

const express = require("express");
const path = require('path');
const app = express();

app.use(express.static("dist"));

app.use(["/players"], function(request, response) {
  let reqPath = path.join(__dirname, "./");
  response.sendFile(
    path.resolve(reqPath, "index.html")
  );
});

app.listen(3000, () => console.log("Listening on port 3000!"));

module.exports = app;
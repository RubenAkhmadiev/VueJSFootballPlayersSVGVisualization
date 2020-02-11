const express = require("express");
const path = require('path');
const app = express();

app.use(express.static("dist"));

app.use(["/eredivisie"], function(request, response) {
  let reqPath = path.join(__dirname, "./");
  response.sendFile(
    path.resolve(reqPath, "index.html")
  );
});

app.get(["/api"], function(request, response) {
  setTimeout(() =>
  response
      .header('Content-Type', 'application/json')
      .send(
        { text: 'Hello world!' }
      )
  , 1000);
  });

app.listen(3000, () => console.log("Listening on port 3000!"));

module.exports = app;
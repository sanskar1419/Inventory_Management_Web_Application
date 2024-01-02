const express = require("express");

const server = new express();

server.get("/", (req, res) => {
  res.send("Welcome to our Inventory Mangement application.");
});
const port = 9000;
server.listen(port, () => {
  console.log(`Server is up and running on the port :: ${port}`);
});

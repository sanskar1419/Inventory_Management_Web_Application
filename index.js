import express from "express";
import path from "path";
import ProductsController from "./src/controllers/products.controller.js";

const server = new express();
const productsController = new ProductsController();

server.use(express.static("src/views"));

server.get("/", productsController.getProducts);
const port = 9000;
server.listen(port, () => {
  console.log(`Server is up and running on the port :: ${port}`);
});

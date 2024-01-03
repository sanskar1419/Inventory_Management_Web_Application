import express from "express";
import path from "path";
import ProductsController from "./src/controllers/products.controller.js";
import expressEjsLayouts from "express-ejs-layouts";

const server = new express();
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

server.use(expressEjsLayouts);

server.use(express.static("src/views"));

const productsController = new ProductsController();
server.get("/", productsController.getProducts);
const port = 9000;
server.listen(port, () => {
  console.log(`Server is up and running on the port :: ${port}`);
});

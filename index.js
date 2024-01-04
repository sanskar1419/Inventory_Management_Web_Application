import express from "express";
import path from "path";
import ProductsController from "./src/controllers/products.controller.js";
import expressEjsLayouts from "express-ejs-layouts";
import formProductValidating from "./src/middlewares/data.validating.js";

const server = new express();

server.use(express.urlencoded({ extended: true }));
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

server.use(expressEjsLayouts);

server.use(express.static("src/views"));

const productsController = new ProductsController();
server.get("/", productsController.getProducts);
server.get("/new", productsController.newProductForm);
server.post("/", formProductValidating, productsController.addNewProduct);
const port = 9000;
server.listen(port, () => {
  console.log(`Server is up and running on the port :: ${port}`);
});

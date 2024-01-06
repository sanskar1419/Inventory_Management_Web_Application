import express from "express";
import path from "path";
import ProductsController from "./src/controllers/products.controller.js";
import UserController from "./src/controllers/users.controller.js";
import expressEjsLayouts from "express-ejs-layouts";
import formProductValidating from "./src/middlewares/data.validating.js";
import { uploadFile } from "./src/middlewares/update-product.middleware.js";

const server = new express();

server.use(express.static("public"));

server.use(express.urlencoded({ extended: true }));
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

server.use(expressEjsLayouts);

server.use(express.static("src/views"));

const productsController = new ProductsController();
const userController = new UserController();
server.get("/", productsController.getProducts);
server.get("/new", productsController.newProductForm);
server.post(
  "/",
  uploadFile.single("imageUrl"),
  formProductValidating,
  productsController.addNewProduct
);
server.get("/update-product/:id", productsController.getUpdateProductView);
server.post("/update-product", productsController.postUpdateProduct);
server.post("/delete-product/:id", productsController.deleteProduct);
server.post("/search", productsController.search);
server.get("/resister", userController.getResister);
const port = 9000;
server.listen(port, () => {
  console.log(`Server is up and running on the port :: ${port}`);
});

import express from "express";
import path from "path";
import session from "express-session";
import ProductsController from "./src/controllers/products.controller.js";
import UserController from "./src/controllers/users.controller.js";
import expressEjsLayouts from "express-ejs-layouts";
import formProductValidating from "./src/middlewares/data.validating.js";
import { uploadFile } from "./src/middlewares/update-product.middleware.js";
import { auth } from "./src/middlewares/auth.middleware.js";
import cookieParser from "cookie-parser";
import { setLastVisit } from "./src/middlewares/lastVisit.middleware.js";

const server = new express();

server.use(express.static("public"));
server.use(cookieParser());
server.use(
  session({
    secret: "Inventory",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
server.use(express.urlencoded({ extended: true }));
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

server.use(expressEjsLayouts);

server.use(express.static("src/views"));

const productsController = new ProductsController();
const userController = new UserController();
server.get("/", setLastVisit, auth, productsController.getProducts);
server.get("/new", auth, productsController.newProductForm);
server.post(
  "/",
  auth,
  uploadFile.single("imageUrl"),
  formProductValidating,
  productsController.addNewProduct
);
server.get(
  "/update-product/:id",
  auth,
  productsController.getUpdateProductView
);
server.post("/update-product", auth, productsController.postUpdateProduct);
server.post("/delete-product/:id", auth, productsController.deleteProduct);
server.post("/search", auth, productsController.search);
server.get("/resister", userController.getResister);
server.get("/login", userController.getLogIn);
server.post("/register", userController.postRegister);
server.post("/login", userController.postLogin);
server.get("/logout", auth, userController.logout);
const port = 9000;
server.listen(port, () => {
  console.log(`Server is up and running on the port :: ${port}`);
});

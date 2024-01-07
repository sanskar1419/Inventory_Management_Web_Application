import UserModel from "../models/user.model.js";
import ProductModel from "../models/product.model.js";

export default class UserController {
  getResister(req, res) {
    res.render("resister");
  }
  getLogIn(req, res) {
    res.render("login", { errorMessage: null });
  }
  postRegister(req, res) {
    const { name, email, password } = req.body;
    UserModel.add(name, email, password);
    res.render("login", { errorMessage: null });
  }
  postLogin(req, res) {
    const { email, password } = req.body;
    const user = UserModel.isValidUser(email, password);
    if (!user) {
      return res.render("/login", { errorMessage: "Invalid Credential" });
    } else {
      let products = ProductModel.get();
      res.render("products", { products: products });
    }
  }
}

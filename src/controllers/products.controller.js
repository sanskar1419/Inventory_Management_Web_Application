import ProductModel from "../models/product.model.js";

export default class ProductsController {
  getProducts(req, res) {
    let products = ProductModel.get();
    res.render("products", { products: products });
  }
}

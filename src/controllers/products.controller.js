import ProductModel from "../models/product.model.js";

export default class ProductsController {
  getProducts(req, res) {
    let products = ProductModel.get();
    res.render("products", { products: products });
  }

  newProductForm(req, res) {
    return res.render("new_product", { errorMessage: null });
  }

  addNewProduct(req, res) {
    ProductModel.add(req.body);
    let products = ProductModel.get();
    res.render("products", { products });
  }
}

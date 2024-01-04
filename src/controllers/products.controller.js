import ProductModel from "../models/product.model.js";

export default class ProductsController {
  getProducts(req, res) {
    let products = ProductModel.get();
    res.render("products", { products: products });
  }

  newProductForm(req, res) {
    return res.render("new_product");
  }

  addNewProduct(req, res) {
    console.log(req.body);
    ProductModel.add(req.body);
    let products = ProductModel.get();
    res.render("products", { products });
  }
}

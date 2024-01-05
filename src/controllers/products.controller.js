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

  getUpdateProductView(req, res) {
    const id = req.params.id;
    let productFound = ProductModel.getById(id);
    // console.log(productFound);
    if (productFound) {
      res.render("update-product", {
        product: productFound,
        errorMessage: null,
      });
    } else {
      res.send("Product Not Found");
    }
  }
}

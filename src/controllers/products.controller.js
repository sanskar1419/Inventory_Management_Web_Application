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
    const { name, desc, price } = req.body;
    const imageUrl = "images/Products_Images/" + req.file.filename;
    ProductModel.add(name, desc, price, imageUrl);
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
  postUpdateProduct(req, res) {
    ProductModel.update(req.body);
    const products = ProductModel.get();
    res.render("products", { products: products });
  }
  deleteProduct(req, res) {
    const id = Number(req.params.id);
    ProductModel.delete(id);
    var products = ProductModel.get();
    // console.log(products);
    res.render("products", { products });
  }

  search(req, res) {
    const { name } = req.body;
    const result = ProductModel.searchResult(name);
    res.render("searchResult", { products: result });
  }
}

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
    // Validating Data
    const { name, price, imageUrl } = req.body;
    let errors = [];
    if (!name || name == "") {
      errors.push("Name can't be Empty");
    }

    if (!price || parseFloat(price) < 1) {
      errors.push("Price can't be Negative");
    }

    try {
      const parseUrl = new URL(imageUrl);
    } catch (error) {
      errors.push("Enter a valid image URL");
    }
    if (errors.length > 0) {
      return res.render("new_product", { errorMessage: errors[0] });
    }
    ProductModel.add(req.body);
    let products = ProductModel.get();
    res.render("products", { products });
  }
}

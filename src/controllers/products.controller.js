import path from "path";

export default class ProductsController {
  getProducts(req, res) {
    res.sendFile(path.join(path.resolve(), "src", "views", "products.html"));
  }
}

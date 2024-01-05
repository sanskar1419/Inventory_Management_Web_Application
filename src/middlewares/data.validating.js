import { body, validationResult } from "express-validator";
const formProductValidating = async (req, res, next) => {
  // Validating Data
  // 1. Define Rules for validation
  const rules = [
    body("name").isLength({ min: 1 }).withMessage("Name is Required"),
    body("imageUrl").isURL().withMessage("Image URL is Missing or not valid"),
    body("price")
      .isFloat({ min: 1.0 })
      .withMessage("Price should be greater than 1.0"),
  ];

  // 2. Run the Rules

  await Promise.all(rules.map((rule) => rule.run(req)));
  let validationErrors = validationResult(req);
  // console.log(validationErrors);
  // 3. Check weather there are validation error or not
  if (!validationErrors.isEmpty()) {
    return res.render("new_product", {
      errorMessage: validationErrors.array()[0].msg,
    });
  } else {
    next();
  }
};

export default formProductValidating;

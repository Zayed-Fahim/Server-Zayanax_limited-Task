const {
  postProductService,
  getProductsService,
  getSearchedProductsService,
  updateProductService,
} = require("../services/product.service");

exports.postProduct = async (req, res, next) => {
  try {
    const product = await postProductService(req.body);
    res.status(200).json({ status: "Success", message: "Product Added!" });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Failed", message: "Internal server error!" });
    next(error);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await getProductsService();
    res.status(200).json({
      status: "Success",
      message: "All Products data are here!",
      payload: products,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Failed", message: "Internal server error!" });
    next(error);
  }
};

exports.getSearchedProducts = async (req, res, next) => {
  const partialSearchQuery = req.query.search;
  try {
    const products = await getSearchedProductsService(partialSearchQuery);
    res.status(200).json({
      status: "Success",
      message: "Here is the matching products/product!",
      payload: products,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Failed", message: "Internal server error!" });
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const result = await updateProductService(req.params.productId, req.body);
    if (!result) {
      return res
        .status(404)
        .json({ status: "Failed", message: "Product not found" });
    }
    res
      .status(200)
      .json({ status: "Success", message: "Product updated successfully" });
  } catch (error) {
    next(error);
    res
      .status(500)
      .json({ status: "Failed", message: "Internal Server Error" });
  }
};

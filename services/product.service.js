const Product = require("../models/Product");

exports.postProductService = async (data) => {
  const product = await Product.create(data);
  return product;
};

exports.getProductsService = async () => {
  const products = await Product.find({});
  return products;
};

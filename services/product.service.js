const Product = require("../models/Product");

exports.postProductService = async (data) => {
  const product = await Product.create(data);
  return product;
};

exports.getProductsService = async () => {
  const products = await Product.find({});
  return products;
};

exports.getSearchedProductsService = async (searchInput) => {
  const searchTerm = searchInput.toLowerCase();
  const partiallyMatched = await Product.find(
    {
      $text: { $search: searchTerm, $caseSensitive: false },
      status: true,
    },
    { score: { $meta: "textScore" } }
  )
    .limit(2)
    .sort({ score: { $meta: "textScore" } });
  if (partiallyMatched.length > 0) {
    return partiallyMatched;
  }
  const exactMatch = await Product.find({ name: searchTerm, status: true });
  return exactMatch || [];
};

exports.updateProductService = async (productId, data) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, data, {
      new: true,
    });
    if (!updatedProduct) {
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

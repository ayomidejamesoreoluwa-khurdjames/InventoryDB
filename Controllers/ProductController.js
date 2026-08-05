const Product = require('../Models/Products');
// console.log("Product model:", Product);

exports.createProduct = async (req, res) => {
    try {
        if (!req.body.name || !req.body.size || !req.body.description || !req.body.price || !req.body.quantity) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
        const { name, size, description, price, quantity } = req.body;

        const product = new Product({ name, size, description, price, quantity });

        await product.save();
        res.status(200).json({ message: 'Product Created Successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Error Creating Product', error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
try {
  const { id } = req.params
  const { name, size, description, price, quantity } = req.body;
  const product = await Product.findByIdAndUpdate(id, { name, size, description, price, quantity }, { new: true });
  
  if (!product) {
  return res.status(404).json({error: "Product not found" })
  }
  
  res.status(201).json({ message: 'Product Updated Successfully', product });
    } 
  catch (error) {
        res.status(500).json({ message: 'Error Updating Product', error: error.message });
    }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // gets all products

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json({ 
      message: "Products fetched successfully", 
      count: products.length,
      products 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error Fetching Products', error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id); // find by id

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product fetched successfully", product });
  } catch (error) {
    res.status(500).json({ message: 'Error Fetching Product', error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id); // delete by id

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product Deleted Successfully", product });
  } catch (error) {
    res.status(500).json({ message: 'Error Deleting Product', error: error.message });
  }
};

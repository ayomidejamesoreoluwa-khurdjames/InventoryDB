const Product = require('../Models/Products');
const upload = require('../Middleware/upload');
const sendEmail = require('../Middleware/emailsender');
// console.log("Product model:", Product);

exports.createProduct = async (req, res) => {
    try {
        if (!req.body.name || !req.body.size || !req.body.description || !req.body.price || !req.body.quantity) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
        const { name, size, description, price, quantity, image } = req.body;

        const product = new Product({ name, size, description, price, quantity });

        await product.save();
        res.status(200).json({ message: 'Product Created Successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Error Creating Product', error: error.message });
    }
};

exports.createProductWithImage = async (req, res) => {
  console.log("BODY:", req.body);
  console.log("FILE:", req.file);
    try {
      if (!req.body.name || !req.body.size || !req.body.description || !req.body.price || !req.body.quantity) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    // upload.single('image')(req, res, async (err) => {
    //   if (err) {
    //     return res.status(400)
    //   }
    // })
        const { name, size, description, price, quantity, image } = req.body;

        if (!req.file) {
      return res.status(400).json({ message: 'Please Upload an Image' });
    }
        const product = new Product({ name, size, description, price, quantity, image: req.file.path });

        await product.save();

        const otp = Math.floor(100000 + Math.random() * 900000);

        const subject = 'New Product Created';
        const text = `A new product has been created: Here is your OTP: ${otp}\n\nName: ${name}\nSize: ${size}\nDescription: ${description}\nPrice: ${price}\nQuantity: ${quantity}`;
        await sendEmail('james.ore.ayomide@gmail.com', subject, text);

        res.status(200).json({ message: 'Product Created Successfully', product });

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded" : "Missing");

    } catch (error) {
    // console.log("FULL ERROR:", error);
    
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

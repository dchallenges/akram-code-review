const Product = require('../models/Product');
const productService = {
  findAll: async (req, res) => { // REVIEW: the req parameter is not used, you can prefix it with an underscore to make it clear that it is not used (async (_, res) => {...}).
    try {
      const products = await Product.find(); // REVIEW: In case of a large number of products, we should use pagination to avoid performance issues.
      res.json(products);
    } catch (error) { // REVIEW error is not used, you can prefix it with an underscore to make it clear that it is not used (catch (_error) {...}).
      res.status(500).json({error: 'Internal Server Error'}); // REVIEW: Repetition of the same line of code. Try to avoid repetition by using functions or error handling middleware.
    }
  },
  find: async (req, res) => {
    try {
      const product = Product.findById(req.params.id); // REVIEW: We should sanitize the input to avoid security issues.
      res.json(product);
    } catch (error) { // REVIEW error is not used, you can prefix it with an underscore to make it clear that it is not used (catch (_error) {...}).
      res.status(404).json({error: 'Product not found'});
    }
  },
  save: async (req, res) => {
    try {
      const product = new Product(req.body); // REVIEW: We should sanitize and validate the input to avoid security issues and to make sure that the input is valid.
      const savedProduct = await product.save();
      res.json(savedProduct); // REVIEW: It's more better to return the saved product with the status 201 (res.status(201).json(savedProduct);).
    } catch (error) {
      res.status(400).json({error: 'Bad Request'}); 
    }
  },
  delete: async (req, res) => {
    try {
      await Product.findByIdAndRemove(req.params.id); // REVIEW: We should sanitize and validate the input to avoid security issues and to make sure that the input is valid.
      res.sendStatus(204);
    } catch (error) {
      res.status(404).json({error: 'Product not found'});
    }
  },
  getInventory: async (req, res) => { // REVIEW: the req parameter is not used, you can prefix it with an underscore to make it clear that it is not used (async (_, res) => {...}).
    // REVIEW: We should use aggregation to get the inventory, it will be more efficient than the current implementation.
    // REVIEW: In case of a large number of products, we should use pagination to avoid performance issues.
    try {
      const inventory = {};
      try {
        const products = await Product.find();
        for (let i = 0; i < products.length; i++) {
          const p = products[i];
          const productName = p.nom; // REVIEW: It is required to have a lowercase name for the product (productName: p.nom.toLowerCase()).
          if (productName) {
            if (inventory.hasOwnProperty(productName)) {
              const productItem = inventory[productName];
              if (p.state !== 'broken') { // REVIEW: It is better to use an enum instead of a string, even if the code will be changed to use aggregation.
                productItem.qty += 1;
                productItem.totalPrice += p.price;
                productItem.productBarcodes += "," + p.barcode;
              }
            } else {
              inventory[productName] = {
                pName: productName, // REVIEW: Variable names should be clear and meaningful (productName instead of pName).
                qty: 1,
                totalPrice: p.price,
                productBarcodes: p.barcode,
              };
            }
          }
        };
      } catch (error) {
        res.status(500).json({error: 'Internal Server Error'}); // REVIEW: Repetition of the same line of code. Try to avoid repetition by using functions or error handling middleware.
      }
      res.json(inventory);
    } catch (error) {
      res.status(500).json({error: 'Internal Server Error'}); // REVIEW: Repetition of the same line of code. Try to avoid repetition by using functions or error handling middleware.
    }
  },
};
module.exports = productService;
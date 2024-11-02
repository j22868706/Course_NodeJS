const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err && fileContent) {
        try {
          cart = JSON.parse(fileContent);
        } catch (parseErr) {
          console.error("Error parsing JSON:", parseErr);
        }
      }
      cart.products = cart.products || []; // Ensure products array exists

      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(
        prod => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;

      // Add new product/ increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty += 1;
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products.push(updatedProduct);
      }

      // Update the total price
      cart.totalPrice += +productPrice;

      // Save the updated cart
      fs.writeFile(p, JSON.stringify(cart), err => {
        if (err) {
          console.error("Error writing file:", err);
        }
      });
    });
  }
};

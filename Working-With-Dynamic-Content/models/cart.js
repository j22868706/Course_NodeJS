// const fs = require('fs');
// const path = require('path');

// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   'data',
//   'cart.json'
// );

// module.exports = class Cart {
//   static addProduct(id, productPrice) {
//     // Fetch the previous cart
//     fs.readFile(p, (err, fileContent) => {
//       let cart = { products: [], totalPrice: 0 };
//       if (!err && fileContent) {
//         try {
//           cart = JSON.parse(fileContent);
//         } catch (parseErr) {
//           console.error("Error parsing JSON:", parseErr);
//         }
//       }
//       cart.products = cart.products || []; // Ensure products array exists

//       // Analyze the cart => Find existing product
//       const existingProductIndex = cart.products.findIndex(
//         prod => prod.id === id
//       );
//       const existingProduct = cart.products[existingProductIndex];
//       let updatedProduct;

//       // Add new product/ increase quantity
//       if (existingProduct) {
//         updatedProduct = { ...existingProduct };
//         updatedProduct.qty += 1;
//         cart.products[existingProductIndex] = updatedProduct;
//       } else {
//         updatedProduct = { id: id, qty: 1 };
//         cart.products.push(updatedProduct);
//       }

//       // Update the total price
//       cart.totalPrice += +productPrice;

//       // Save the updated cart
//       fs.writeFile(p, JSON.stringify(cart), err => {
//         if (err) {
//           console.error("Error writing file:", err);
//         }
//       });
//     });
//   }


// static deleteProduct(id, productPrice) {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       console.error("Error reading file:", err);
//       return;
//     }
    
//     const cart = JSON.parse(fileContent); // Parse the cart from the file
//     const updatedCart = { ...JSON.parse(fileContent) };
//     const productIndex = updatedCart.products.findIndex(prod => prod.id === id);
    
//     if (productIndex === -1) {
//       console.warn("Product not found in cart.");
//       return;
//     }

//     const product = updatedCart.products[productIndex];
//     const productQty = product.qty;

//     // Remove the product from the products array
//     updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);

//     // Update the total price
//     updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;

//     // Write the updated cart back to the file
//     fs.writeFile(p, JSON.stringify(updatedCart), err => {
//       if (err) {
//         console.error("Error writing file:", err);
//       }
//     });
//   });
// }

// static getCart(cb) {
//   fs.readFile(p, (err, fileContent) => {
//     const cart = JSON.parse(fileContent);
//     if (err) {
//       cb(null);
//     } else {
//       cb(cart);
//     }
//   })
// }

// };


// Using the sequelize
const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Cart = sequelize.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});

module.exports = Cart;
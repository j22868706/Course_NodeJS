const Product = require('../models/product');
const Cart = require('../models/cart');

// exports.getProducts = (req, res, next) => {
//   Product.fetchAll(products => {
//     res.render('shop/product-list', {
//       prods: products,
//       pageTitle: 'All Products',
//       path: '/products'
//     });
//   });
// };

exports.getProducts = (req, res, next) => {
  Product.findAll().then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
   });
 }).catch(err => {console.log(err)});
}
//   Product.fetchAll()
//     .then(([rows, fieldData]) => { 
//       res.render('shop/product-list', {
//         prods: rows,
//         pageTitle: 'All Products',
//         path: '/products'
//       });
//     })
//     .catch(err => console.log(err));
// };

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // Product.findAll().then(products => {
  //   res.render('shop/product-detail', {
  //     product: products[0],
  //     pageTitle: products[0].title,
  //     path: '/products'
  //  });
  // }).catch(err => console.log(err))

  Product.findByPk(prodId).then(product => {
     res.render('shop/product-detail', {
       product: product,
       pageTitle: product.title,
       path: '/products'
    });

  }).catch(err => {console.log(err)});
}
//   const prodId = req.params.productId;
//   Product.findById(prodId)
//   .then(([product]) => {
//     res.render('shop/product-detail', {
//       product: product[0],
//       pageTitle: product.title,
//       path: '/products'
//     });
//   }) 
//   .catch(err => console.log(err))
// }

// exports.getProduct = (req, res, next) => {
//   const prodId = req.params.productId;
//   Product.findById(prodId, product => {
//     res.render('shop/product-detail', {
//       product: product,
//       pageTitle: product.title,
//       path: '/products'
//     });
//   });
// };

// exports.getIndex = (req, res, next) => {
//   Product.fetchAll(products => {
//     res.render('shop/index', {
//       prods: products,
//       pageTitle: 'Shop',
//       path: '/'
//     });
//   });
// };
exports.getIndex = (req, res, next) => {
  Product.findAll().then(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });

  }).catch(err => {console.log(err)});
  // Product.fetchAll()
  //   .then(([rows, fieldData]) => {
      
  //   })
  //   .catch(err => console.log(err));
}

exports.getCart = (req, res, next) => {
  req.user.getCart()
    .then(cart => {
      return cart.getProducts()
    .then(products => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      });
    })
    .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
  // Cart.getCart(cart => {
  //   Product.fetchAll(products => {
  //     const cartProducts = [];
  //     for (product of products) {
  //       const cartProductData = cart.products.find(prod => prod.id === product.id)
  //       if (cartProductData){
  //         cartProducts.push({
  //           productData: product,
  //           qty: cartProductData.qty
  //         });
  //       } 
  //     }
  //     res.render('shop/cart', {
  //       path: '/cart',
  //       pageTitle: 'Your Cart',
  //       products: cartProducts
  //     });
  //   })
  // })
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: {id: prodId}})
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        const product = products[0];
      }
      let newQty = 1;
      if (product) {
      }
      return Product.findByPk(prodId)
        .then(product => {
          return fetchedCart.addProduct(product, {
            through: { quantity: newQty}
          })
          .catch(err => console.log(err));
        })
        .then(() => {
          res.redirect('/cart');
        })
    })
    .catch(err => console.log(err));

  // Product.findById(prodId, (product) => {
  //   if (!product) {
  //     // If product is not found, handle the error gracefully
  //     console.error(`Product with ID ${prodId} not found.`);
  //     return res.redirect('/products');
  //   }
    
  //   // Add product to cart only if it exists
  //   Cart.addProduct(prodId, product.price);
  //   res.redirect('/cart');
  // });
};


exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findById(prodId, (product) => {
    if (!product) {
      // If the product is not found, log an error and redirect to the cart
      console.error(`Product with ID ${prodId} not found for deletion.`);
      return res.redirect('/cart');
    }

    // Only delete the product from the cart if it exists
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

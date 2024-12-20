const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('673c26ade2c68c0942f8dc5c')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://node-user:node-user01@cluster.1qkur.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster'
  )
  .then(result => {
    User.findOne({})  
      .then(user => {
        if (!user) {
          const newUser = new User({
            name: 'Hungchih',
            email: 'hungchih@gmail.com',
            cart: {
              items: []
            }
          });
          newUser.save();
        }
        app.listen(3000);
      })
      .catch(err => {
        console.log(err);
      });
  })
  .catch(err => {
    console.log(err);
  });



const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = mongoose.model("User");

// Hash and salt password in contrroller
// const salt = bcrypt.genSaltSync(10);
// const hash = bcrypt.hashSync("B4c0//", salt);


class UsersController {
  homepage(req, res){
      return res.render('index');
  }
  create(req, res) {
    if (req.body.password != req.body.password_confirmation) {
      return res.json({
        errors: {
          password: {
            message: "Your passwords do not match"
          }
        }
      });

      User.create(req.body, (err, user) => {
        if (err) {
          return res.json(err);
        }
        req.session.user_id = user._id;
      });
    }
  }

  authenticate(req, res) {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        return res.json(err);
      }
      if (user && user.authenticate(req.body.password)) {
        req.session.user_id = user._id;
        return res.json(user);
      }
      return res.json({
        errors: {
          login: {
            message: "Invalid credentials"
          }
        }
      });
    });
  }
  session(req, res) {
    if (req.session.user_id) {
      return res.json({ status: true });
    } else {
        return res.json({ status: false });
    }
    User.findById(req.session.user_id, (err, user) => {
      if (err) {
        return res.json(err);
      }
      return res.json(user);
    });
  }

  logout(req, res) {
    delete req.session.user_id;
    return res.json({ status: true });
  }
}

module.exports = new UsersController();



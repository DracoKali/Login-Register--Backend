const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name cannot be blank"]
    },
    email: {
      type: String,
      required: [true, "Email cannot be blank"]
    },
    password: {
      type: String,
      required: [true, 'Password cannot be blank']
    }
  },
  { timestamps: true }
);
UserSchema.pre('save', function(next) {
    console.log(this);
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
    next();
});

UserSchema.method.authenticate = function(password){
    return bcrypt.compareSync(password, this.password);
};

mongoose.model("User", UserSchema);

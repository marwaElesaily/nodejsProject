const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  //{"country":"cairo","firstName":"safa","lastName":"hassa","displayName":"safa","email":"safa@gmail.com",
// "password":"12345","dateOfBirth":"1999-11-27"}
  {
    country: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      minLength: 3,
      maxLength: 20
    },
    lastName: {
      type: String,
      minLength: 3,
      maxLength: 20
    },
    displayName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
      unique: true,
    },
    email: {  //"safa@gmail.com"
      type: String,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z]{3,8}(@)(gmail|yahoo|outlook)(.com)$/.test(v);
        },
        message: (props) => {
          console.log(props);
          return `${props.value} is not a valid email !`;
        },
      },
    },
    password: {
      type: String,
      required: true,
    },
    preferredLanguage: {
      type: String,
      default: 'english'
    },
    dateOfBirth: {
      type: Date,
      required: true
    },
    purchaseHistory: {
      type: [mongoose.SchemaTypes.ObjectId],
   
      ref: "Game",
    },
    wishList: {
      type: [mongoose.SchemaTypes.ObjectId],
   
      ref: "Game",
    },
    cart: {
      type: [mongoose.SchemaTypes.ObjectId],
   
      ref: "Game",
    }
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  // console.log(this);
  const salt = bcrypt.genSaltSync(12);
  const hashedPassword = bcrypt.hashSync(this.password, salt);
  this.password = hashedPassword;
  next();
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
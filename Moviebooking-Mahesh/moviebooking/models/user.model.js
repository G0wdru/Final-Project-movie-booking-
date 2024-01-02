module.exports = (mongoose) => {
    const User = mongoose.model(
      "users",
      mongoose.Schema({
        userid: Number,
        email: String,
        first_name: String,
        last_name: String,
        username: String,
        contact: String,
        password: String,
        role: String,
        isLoggedIn: Boolean,
        uuid: String,
        accesstoken: String,
        coupens: [
          {
            id: Number,
            discountValue: Number,
          },
        ],
        bookingRequests: [
          {
            reference_number: Number,
            coupon_code: Number,
            show_id: Number,
            tickets: [Number],
          },
        ],
      })
    );
  
    return User;
  };
  








//  const mongoose = require("mongoose")

//  const userSchema = new mongoose.Schema({
//     userId : {
//         type: Number
//     },
        
//         email: String,
        
//         first_name: String,
        
//         last_name: String,
        
//         username: String,
        
//         contact: String,
        
//         password: String,
        
//         role: String,
        
//         isLoggedIn: Boolean,
        
//         uuid: String,
        
//         accesstoken: String,
        
//         coupens: {
        
//         type: [
//             {
//             id: Number,
//             discountValue: Number,
//             }
//         ],
//     },
//         bookingRequests: [
//             {
//                 reference_number: Number,
//                 coupon_code: Number,
//                 show_id: Number,
//                 tickets: [
//                     Number
//                 ]
//             },
//         ]
//  });

//  const User = mongoose.model('users', userSchema);

//  module.exports = User;
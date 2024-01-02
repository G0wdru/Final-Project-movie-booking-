module.exports = app => {
    const users = require("../controllers/user.controller");
  
      var router = require("express").Router();
  
      router.post("/auth/login", users.login);
  
      router.post("/auth/signup", users.signUp);
  
      router.post("/auth/logout", users.logout);
  
      router.get("/getCouponCode", users.getCouponCode);
  
      router.get("/bookShow", users.bookShow);
  
      app.use('/api', router);
    };
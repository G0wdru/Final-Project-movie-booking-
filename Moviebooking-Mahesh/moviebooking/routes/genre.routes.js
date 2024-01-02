module.exports = app => {
    var genres= require("../controllers/genre.controller");
  
    var router = require("express").Router();
  
    router.get('/genres',genres.findAllGenres);
  
    app.use('/api', router);
  }  
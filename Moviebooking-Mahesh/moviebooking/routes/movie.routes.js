module.exports= app =>{
    const movies= require("../controllers/movie.controller.js");
  
    var router = require("express").Router();
  
  
    router.get('/movies',movies.findAllMovies);
  
    router.get('/movies?status=PUBLISHED',);
  
    router.get('/movies?status=RELEASED',);
  
    router.get('/movies/:movieId',movies.findOne);
  
   //router.get('/movies?status=RELEASED&title={title}&genres={genres}&artists={artists}&start_date={startdate}&end_date={enddate}',);
  
    app.use('/api', router);
  }; 
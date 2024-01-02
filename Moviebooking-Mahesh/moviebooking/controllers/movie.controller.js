var express = require('express');
const db = require("../models");
const Movie = db.movies;

async function findAllMovies(req,res){

    try{
    let status= await req.query.status;
    console.log(status);
    let condition = {}
    if(status){

        status = status.toLowerCase();
        condition[status]=true
    }
    console.log(status);

    console.log(condition);
    const data= await db.movies.find(condition);
    console.log(data);
    res.json(data);
    }
    catch(err) {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Movie data."
        });
      }

}

async function findOne(req,res){
    const id = req.params.movieId;
    const data =await db.movies.find({"movieid": id});
    console.log(id);
    console.log(data);
    if(!data){
        res.status(404).send({ message: "Not found movie with id " + id });
    }
    res.json(data);

}

async function findShows(req,res){

    const id=req.params.movieId;
    const show=await db.movies.findById(id).shows;

    if(!show  || shows.length === 0){
        res.status(404).send({ message: "Not found shows with id " + id });
    }
    else{
        res.json(show);
    }

}

module.exports={
    findAllMovies,
    findOne,
    findShows
} 

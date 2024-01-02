var express = require('express');
const db = require("../models");
const Genre = db.genres;

async function findAllGenres(req,res){
    const data= await db.genres.find({});
    res.json(data);
}

module.exports={
    findAllGenres
} 

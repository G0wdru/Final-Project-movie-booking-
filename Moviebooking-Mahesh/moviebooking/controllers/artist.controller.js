var express = require('express');
const db = require("../models");
const Artist = db.artists;

async function findAllArtists(req,res){
    const data= await db.artists.find({});
    res.json(data);
}

module.exports={
    findAllArtists
}

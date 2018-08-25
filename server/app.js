
const express =        require('express');
const morgan =         require('morgan');
const axios =          require('axios');
const app =            express();

var url =              'http://www.omdbapi.com/?apikey=8730e0e&'
var movie;
var cache = [];

app.get('/', function (req, res, next) {
    var movie = req.query;
    console.log(movie);
    var key = Object.keys(movie)[0];
    console.log(key);
    var value = movie[key];
    console.log(value);
    if (cache.hasOwnProperty(value)) {
        res.send(cache[value])
    } else {
        axios
            .get(url + key + '=' + encodeURI(value))
            .then(function(response) {
                res.status(200).send(response.data);
                cache[value] = response.data;
                next();
            })
            .catch(function(error) {
                res.sendStatus(500);
            })
    }
})

module.exports = app;
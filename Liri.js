require("dotenv").config();

var fs = require("fs");
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var action = process.argv[2];
var spliceIt = process.argv.splice(3);
var value = spliceIt.join("+");

switch (action) {
  case "concert-this":
    if (value != undefined) {
      concertThis(value);
      log(action, value);
    }
    value = "avicci";
    concertThis(value);
    log(action, value);
    break;
  case "spotify-this-song":
    if (value != undefined) {
      spotifyThis(value);
      log(action, value);
    }
    value = "the+sign";
    spotifyThis(value);
    log(action, value);
    break;
  case "movie-this":
    if ((value = undefined)) {
      movieThis(value);
      log(action, value);
    }
    value = "mr+nobody";
    movieThis(value);
    log(action, value);
    break;
  case "do-what-it-says":
    doWhat(value);
    log(action, value);
    break;
}
//concert-this

function concertThis(value) {
  var url =
    "https://rest.bandsintown.com/artists/" +
    value +
    "/events?app_id=codingbootcamp";
  axios
    .get(url)
    .then(response => {
      // console.log(response);
      //console.log(response.data.length);
      for (i = 1; i < response.data.length; i++) {
        var venue = response.data[i].venue.name;
        var city = response.data[i].venue.city;
        var date = moment(response.data[i].datetime).format(
          "MMMM Do YYYY, h:mm a"
        );
        console.log("Show #" + i);
        console.log("Venue :" + venue);
        console.log("City: " + city);
        console.log("Date: " + date);
      }
    })
    .catch(error => {
      console.log(error);
    });
}

//function spotifyThis()

function spotifyThis(value) {
  spotify.search({ type: "track", query: value }, function(err, data) {
    if (err) {
      return console.log(err);
    }
    var artist = data.tracks.items[0].album.artists[0].name;
    var song = data.tracks.items[0].name;
    var preview = data.tracks.items[0].preview_url;
    var album = data.tracks.items[0].album.name;
    console.log("Song name : " + song);
    console.log("Artist: " + artist);
    console.log("From Album: " + album);
    console.log("Wanna Listen? " + preview);
  });
}

//function movieThis()

function movieThis(value) {
  var url = "http://www.omdbapi.com/?apikey=e7285efe&t=" + value;
  axios
    .get(url)
    .then(response => {
      // console.log(response);
      var title = response.data.Title;
      var year = response.data.Year;
      var imdb = response.data.Ratings[0].Value;
      var tom = response.data.Ratings[1].Value;
      var country = response.data.Country;
      var language = response.data.Language;
      var plot = response.data.Plot;
      var cast = response.data.Actors;
      console.log("title: " + title);
      console.log("released in " + year);
      console.log("imdb: " + imdb);
      console.log("rotten tomatoes: " + tom);
      console.log("was produced in " + country);
      console.log("languages: " + language);
      console.log("plot: " + plot);
      console.log("cast is : " + cast);
    })
    .catch(error => {
      console.log(error);
    });
}

//function doWhat(value)
//get back to it later
function doWhat(value) {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      console.log(err);
    }
    var txtData = data.split(",");
    action = txtData[0];
    //console.log(action);
    var valueOne = txtData[1];
    //console.log(valueOne);
    //source fore replace code https://stackoverflow.com/questions/19873002/how-to-replace-all-spaces-in-a-string/19873010
    myvalue = valueOne.replace(/ /g, "+");
    //console.log(value);
    if ((action = "concert-This")) {
      value = myvalue;
      concertThis(value);
    }
    if ((action = "spotify-this-song")) {
      value = myvalue;
      spotifyThis(value);
    }
    if ((action = "movie-this")) {
      value = myvalue;
      movieThis(value);
    }
  });
}
//Bonus
function log() {
  fs.appendFile("log.txt", ", " + action + " for" + value, function(err) {
    if (err) {
      console.log(err);
    }
    console.log("logged");
  });
}

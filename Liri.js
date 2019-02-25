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
    concertThis(value);
    break;
  case "spotify-this-song":
    spotifyThis(value);
    break;
  case "movie-this":
    movieThis(value);
    break;
  case "do-what-it-says":
    doWhat(value);
    break;
}
//concert-this
// just figure the value= rhye
function concertThis(value) {
  //   if ((value = undefined)) {
  //     value = "rhye";
  //   }
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
//need to add value="The+Sign"
function spotifyThis(value) {
  //   if ((value = null)) {
  //     value = "The+Sign";
  //   }
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
//working i just need to figure the api problem
//value = 'mr+nobody'

function movieThis(value) {
  var url = "http://www.omdbapi.com/?apikey=38d9d9f4=" + value;
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
    value = txtData[0].join("+"); //problem here
    // if ((action = "concert-This")) {
    //   concertThis(value);
    // }
    // if ((action = "spotify-this-song")) {
    //   spotifyThis(value);
    // }
    // if ((action = "movie-this")) {
    //   movieThis(value);
    // }
  });
}

require("dotenv").config();

// var fs = require("fs");
var keys = require("./keys.js");
var axios = require("axios");
// var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var action = process.argv[2];
var spliceIt = process.argv.splice(3);
var value = spliceIt.join("+");

switch (action) {
  case "concert-this":
    concertThis();
    break;
  case "spotify-this-song":
    spotifyThis();
    break;
  case "movie-this":
    movieThis();
    break;
  case "do-what-it-says":
    doWhat();
    break;
}
//concert-this
// find the correct line to show data then use for loop
function concertThis() {
  var url =
    "https://rest.bandsintown.com/artists/" +
    value +
    "/events?app_id=codingbootcamp";
  axios
    .get(url)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
}

//function spotifyThis()
//need to add value="The+Sign"
function spotifyThis() {
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
function movieThis() {
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

//function doWhat()
//get back to it later
// function doWhat() {
//   fs.readFile("random.txt", "utf8", function(err, data) {
//     if (err) {
//       console.log(err);
//     }
//     if ((data = "concert-This")) {
//       action = data[0];
//       value = data[1];
//       concertThis();
//     }
//     if ((data = "spotify-this-song")) {
//       action = data[0];
//       value = data[1];
//       spotifyThis();
//     }
//     if ((data = "movie-this")) {
//       action = data[0];
//       value = data[1];
//       movieThis();
//     }
//   });
// }

require("dotenv").config();

var keys = require("./keys");
var spotify = new Spotify(keys.spotify);

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

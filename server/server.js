const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.post("/login", (req, res) => {
  console.log(req);
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    clientId: "76828603dd284ae4a7f859fdab19e990",
    clientSecret: "421c292684d44a40bbc4169da5dd4022",
    redirectUri: "http://localhost:7447",
  });

  spotifyApi.authorizationCodeGrant(code).then(
    function (data) {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    },
    function (err) {
      res.sendStatus(400);
      console.log("Something went wrong!", err);
    }
  );
});

app.listen(4444);

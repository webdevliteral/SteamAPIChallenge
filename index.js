const express = require('express');
const SteamAPI = require('steamapi');
const steam = new SteamAPI('EC4E8B36737A5B4E067C1F0C2CF985A4');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 8080;
const APIKEY = 'EC4E8B36737A5B4E067C1F0C2CF985A4';
const cors = require('cors');
const path = require('path');


var corsOptions = {
    origin: 'http://localhost:8081',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.route('/steamsearch/:name').get((req, res) => {
  var steamUserInfo = [];
    steam.resolve('https://steamcommunity.com/id/' + req.params['name']).then(id => {
        steam.getUserSummary(id).then(summary => {
            steamUserInfo = [];
            steamUserInfo.push(summary);
            steam.getUserOwnedGames(id).then(games => {
              steamUserInfo.push(games);
              console.log(steamUserInfo);
              res.send(steamUserInfo);
            });
        });
    });
});

if(process.env.NODE_ENV === 'production') {
  //static folder
  app.use(express.static(__dirname + '/Client/dist/PortfolioApp'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+ '/Client/dist/PortfolioApp/index.html'));
  });
}
else {
  app.get('/', (req,res) => res.send('Express + TypeScript Server'));
}

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});


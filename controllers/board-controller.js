var Tile       = require('../models/boardTile-model.js');
var bodyParser = require('body-parser');

module.exports = {

  //will retrieve all Tiles
  getAll: function(request, response) {
    Tile.find({}, function(err, data) {
      
      if (err) {
        response.status(404)
        response.json({msg: 'failed'})
      }else{
        response.status(200);
        //console.log('Get tile: ', data);
        response.json(data);
      }
    });
  },

  //will retrieve one tile
  //superagent localhost:3000/api/tile/55ac02ac6ba6fcc4177f257f get
  getTile: function(request, response) {
    //console.log('Get Tile: ', request.params.id);

    Tile.findById(request.params.id, function(err, data) {
      if (err) {
        response.status(404)
        response.json({msg: 'failed'});
      }else{
        response.status(200);
        response.json(data);
      }
    });
  },


  // will create a new tile
  // superagent localhost:3000/api/tile/Mountain post
  post: function(request, response) {

    var tile = new Tile({
      terrain: [],
      hasEncounters: false,
      encounters: [],
      hasPlayers: false,
      players: []
    });

    //console.log(tile);
    tile.terrain.push(capitalizeWord(request.params.name));

    tile.save(function(err) {
      if(err){
        response.status(404);
        response.json({msg: 'failed'});
      }else{
        response.status(200);
        response.json({msg: 'success'});
      }
    });
  },
  
  //will update a tile with a player
  // '{"id":"55ac02ac6ba6fcc4177f257f","data":{"hasPlayers":"true", "players":["sdlfkds73rcf32sdf"]}}'
  // superagent localhost:3000/api/tile put '{"id":"55abe3d39575e72010d3ed97","data":{"hasPlayers":"true", "players":["icnew75345f43nre434"]}}'
  putPlayer: function(request, response) {
    //req.params.id
    var tileID = JSON.stringify(request.body.id);
    var tileData = request.body.data;

    //console.log('Put Tile: ', request.body.id, tileID, tileData);

    Tile.find(request.body.id, function(err, item) {
      if (err) {
        response.status(404)
        response.json({msg: 'err'});
      }else{

        var hasPlayer = (item[0].hasPlayers === tileData.hasPlayers || tileData.hasPlayers === null)? item[0].hasPlayers: tileData.hasPlayers;
        item[0].hasPlayers = hasPlayer;

        if(hasPlayer && tileData.players.length > 0) {
          for(var encPlayers = 0; encPlayers < tileData.players.length; encPlayers++){
            if(tileData.players[encPlayers] !== item[0].players[encPlayers]){
              item[0].players.push(tileData.players[encPlayers]);
            }
          }
        }

        item[0].save(function(err) {
          if(err){
            response.status(404);
            response.json({msg: 'failed'});
          }else{
            response.status(200);
            response.json({msg: 'success'});
          }
        });

      }
    });
  },

//will update a tile with an encounter
  // '{"id":"55ac02ac6ba6fcc4177f257f","data":{"hasPlayers":"true", "players":["sdlfkds73rcf32sdf"]}}'
  // superagent localhost:3000/api/tile put '{"id":"55abe3d39575e72010d3ed97","data":{"hasEncounters":"true", "encounters":["icnew75345f43nre434"]}}'
  putEncounter: function(request, response) {
    //req.params.id
    var tileID = JSON.stringify(request.body.id);
    var tileData = request.body.data;

    //console.log('Put Tile: ', request.body.id, cellID, tileData);

    Tile.find(request.body.id, function(err, item) {
      if (err) {
        response.status(404)
        response.json({msg: 'err'});
      }else{

        var hasEnc = (item[0].hasEncounters === tileData.hasEncounters || tileData.hasEncounters === null)? item[0].hasEncounters: tileData.hasEncounters;
        item[0].hasEncounters = hasEnc;

        if(hasEnc && tileData.encounters.length > 0) {
          for(var encNum = 0; encNum < tileData.encounters.length; encNum++){
            item[0].encounters.push(tileData.encounters[encNum]);
          }
        }

        item[0].save(function(err) {
          if(err){
            response.status(404);
            response.json({msg: 'failed'});
          }else{
            response.status(200);
            response.json({msg: 'success'});
          }
        });

      }
    });
  },

  //this probably should not remain for production.
  deleteAll: function(request, response) {
    console.log('Deleteing entire collection');
    Tile.remove({}, function(err, item) {
      if(err){
        response.status(404);
        response.json({msg: 'failed'});
      }else{
        response.status(200);
        response.json({msg: 'success'});
      }
    });
  },

  // will delete a tile
  // superagent localhost:3000/api/tile/55abe5dcba13974a10308093 delete
  delete: function(request, response) {

    //console.log('Delete Tile: ', request.params.id);

    Tile.findById(request.params.id, function(err, item) {
      
      if (err) {
        response.status(404)
        response.json({msg: 'err'});
      }else{

        item.remove(function(err) {
          if(err){
            response.status(404);
            response.json({msg: 'failed'});
          }else{
            response.status(200);
            response.json({msg: 'success'});
          }
        });

      }

    });
  },

  // tile queries //////////////////////////////////////////////////
  // find tiles containing players
  getPlayer: function(request, response) {
    console.log('find players in tiles')
    var query = Tile.find({ 'hasPlayers': true });
    query.select('players');
    query.exec(function (err, players) {
    console.log(players);
     if(err){
        response.status(404);
        response.json({msg: 'failed'});
      }else{
        response.json(players);
      }
    })
  },

  // capatialize word ///////////////////////////////////////////////
  capitalizeWord: function (word) {

    var newWord = word;
    newWord = newWord.toLowerCase().replace(/\b[a-z]/g, function(letter) {
      return letter.toUpperCase();
    });

    return newWord;
  }
}


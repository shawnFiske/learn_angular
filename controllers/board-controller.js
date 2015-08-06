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
  createTile: function(request, response) {

    var tile = new Tile({
      terrain: [],
      hasEncounters: false,
      encounters: [],
      hasPlayers: false,
      editing: false,
      players: []
    });                                                                                                                                                                                                                                                                                                                                                                                                                                      

    //console.log(tile);
    var capitalizeWord = function (word) {
      var newWord = word;
      newWord = newWord.toLowerCase().replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
      });
      return newWord;
    }

    tile.terrain.push(capitalizeWord(request.body.tileName));

    tile.save(function(err) {
      if(err){
        response.status(404);
        response.json({msg: 'failed'});
      }else{
        response.status(200);
        response.json(tile);
      }
    });
  },

  updateTile: function(request, response) {
    request.body.editing = false;

    Tile.update({'_id': request.params.id}, request.body, function(err) {
      if(err){
        response.status(404).json({msg: 'failed'});
      }else{
        response.status(200).json({msg: 'success'});
      }
    });
  },

   // will delete a tile
  // superagent localhost:3000/api/tile/55abe5dcba13974a10308093 delete
  deleteTile: function(request, response) {

    Tile.findById(request.params.id, function(err, tile) {
      
      if (err) {
        response.status(404)
        response.json({msg: 'err'});
      }else{

        tile.remove(function(err) {
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

  // capatialize word ///////////////////////////////////////////////
  capitalizeWord: function (word) {

    var newWord = word;
    newWord = newWord.toLowerCase().replace(/\b[a-z]/g, function(letter) {
      return letter.toUpperCase();
    });

    return newWord;
  }
}


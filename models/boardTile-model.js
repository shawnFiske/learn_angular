var mongoose      = require('mongoose');
var boardTileSchema  = mongoose.Schema({
  terrain: Array,
  hasEncounters: Boolean,
  encounters: Array,
  hasPlayers: Boolean,
  players: Array
});


module.exports = mongoose.model('Tile', boardTileSchema);
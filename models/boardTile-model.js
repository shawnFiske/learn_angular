var mongoose      = require('mongoose');
var boardTileSchema  = mongoose.Schema({
  terrain: Array,
  hasEncounters: Boolean,
  encounters: Array,
  hasPlayers: Boolean,
  players: Array,
  editing: Boolean
});


module.exports = mongoose.model('Tile', boardTileSchema);
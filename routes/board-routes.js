
 var bodyParser       = require('body-parser');
 var boardController  = require('../controllers/board-controller');

 module.exports       = function(router) {
  router.use(bodyParser.json());

  router.get('/', boardController.getAll);
  
  router.get('/tile/:id', boardController.getTile);

  router.post('/tile/:name', boardController.getAll);

  //superagent localhost:3000/api/tile put '{"id":"55abe3d39575e72010d3ed97","data":{"hasPlayers":"true", "players":["icnew75345f43nre434"]}}'
  router.put('/tile/player', boardController.putPlayer);

  // superagent localhost:3000/api/tile put '{"id":"55abe3d39575e72010d3ed97","data":{"hasEncounters":"true", "encounters":["icnew75345f43nre434"]}}'
  router.put('/tile/encounters', boardController.putEncounter);

  router.delete('/tile', boardController.getAll);

  router.delete('/tile/:id', boardController.getAll);

  router.get('/players', boardController.getPlayer)

}
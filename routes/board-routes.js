
 var bodyParser       = require('body-parser');
 var boardController  = require('../controllers/board-controller');

 module.exports       = function(router) {
  router.use(bodyParser.json());

  router.get('/tile', boardController.getAll);
  router.post('/tile', boardController.createTile);
  router.delete('/tile/:id', boardController.deleteTile);
  router.put('/tile/:id', boardController.updateTile);
  
  //router.get('/tile/:id', boardController.getTile);

}
'use strict'

//used for consistance. less chance of collisions
module.exports = exports = function (app) {
  require('./controllers/board_controller')(app);
};

var express       = require('express');
var mongoose      = require('mongoose');
var app           = express();
var port          = process.env.PORT || 3000;
var boardRoutes   = express.Router();
app.use(express.static(__dirname + '/build'));

require('./routes/board-routes')(boardRoutes);
app.use('/api', boardRoutes);

mongoose.connect(process.env.DATABASE || 'mongodb://localhost/boardGame2');

//listen for requests on port
app.listen(port, function() {
  console.log('Server available at localhost: ' + port);
});
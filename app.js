var express     = require('express'),
    app         = express(),
    mongoose    = require('mongoose'),
    bodyParser  = require('body-parser')
    dbLink      = 'mongodb://localhost/legendary-v01',
    morgan      = require('morgan');

app.use( express.static('./public') );
app.use( bodyParser.urlencoded({extended: true}) );
app.use( bodyParser.json() );
app.set('view engine', 'jade');
mongoose.connect(dbLink);

app.get('/', function(req, res){
  res.render('index');
})

var port = process.env.PORT || 4040;
app.listen(port, function(){
  console.log('...the magic is happening on port ' + port);
});

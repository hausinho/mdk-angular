var express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override'),
    swig  = require('swig'),
    compression = require('compression'),
    port = parseInt(process.env.PORT, 10) || 3000,
    is_production = (process.env.NODE_ENV === 'production') ? true : false;


app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

if(is_production){
  port = 2000; // THIS IS THE PRODUCTION PORT ON musik.dk
  app.use(compression());
  app.use(express.static(__dirname + '/public'));
} 
else 
{
  app.use(express.static(__dirname + '/public'));
}

app.use(errorHandler({
  dumpExceptions: true,
  showStack: true
}));

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('showStackError', true);
app.disable('x-powered-by');

var router = express.Router(); 

router.get('*', function(req, res, next){
	res.render('index', {base_url: '', is_production: is_production});
});



app.use(router);

app.listen(port);

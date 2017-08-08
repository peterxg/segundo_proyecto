const express         = require("express"),
      app             = express(),
      bodyParser      = require("body-parser"),
      methodOverride  = require("method-override"),
      mongoose        = require('mongoose'),
      port            = process.env.PORT || 3000;

mongoose.Promise = global.Promise;

/*
mongoose.connection.openUri('mongodb://localhost/clinica', function(err,res){
  if(err) console.log('Error:' + err);
  else console.log('connected to mongoDB');       
});
*/

//permite conexiones desde otras aplicaciones
app.use(function(req,res,next)
{
    res.header('Access-Control-Allow-Origin',"*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers','Content-type');
    next();
})


mongoose.connect('mongodb://localhost/clinica', function(err, res) {
  if(err) console.log('Error:' + err);
  else console.log('connected to mongoDB');
});


//app.db= mongoose.createConnection('mongodb://localhost/clinica');
//app.db.on('error',console.error.bind(console,'mongoose connection'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

const models     = require('./models/user')(app, mongoose);
const Func = require('./controllers/index');
const routes = express.Router();

routes.get('/', function(req, res) {
        res.send("Corriendo servidor !!!");
        });

routes.route('/clinica')
  .get(Func.findAllUser)
  .post(Func.addUser)

routes.route('/clinica/:id')
  .get(Func.findById)
  .put(Func.updateUser)
  .delete(Func.deleteUser)
//
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Node server running on http://localhost:${port}`)
});

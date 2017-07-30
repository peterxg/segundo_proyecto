const express         = require("express"),
      app             = express(),
      bodyParser      = require("body-parser"),
      methodOverride  = require("method-override"),
      mongoose        = require('mongoose'),
      port            = process.env.PORT || 3000;

mongoose.Promise = global.Promise;

mongoose.connection.openUri('mongodb://localhost/clinica', function(err,res){
  if(err) console.log('Error:' + err);
  else console.log('connected to mongoDB');       
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

const models     = require('./models/user')(app, mongoose);
const Func = require('./controllers/index');
const routes = express.Router();

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

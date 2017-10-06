var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var db = require("./models");

var app = express();
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));
// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

var routes = require("./controllers/burgers_controller");

app.use("/", routes);
app.use("/update", routes);
app.use("/create", routes);

// listen on port 3000
var port = process.env.PORT || 3000;

// db.sequelize.sync({
//     force: true
// }).then(function() {
//     app.listen(port, function() {
//         console.log("listening....", port)
//     })

    db.sequelize.sync().then(()=> {
      app.listen(port , ()=> {
        console.log('listening : ', port);
      });
    })

var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var config = require("./config");
var mongoose = require("mongoose");
var app = express();
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var port = process.env.PORT || 8080;
var userController = require('./api/controller/userController')
var setupController = require("./api/controller/setupController");
var todoController = require("./api/controller/todoController");
var MongoStore = require('connect-mongo')(session);

app.use("/assets", express.static(__dirname + "/publich"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(morgan("dev"));

app.set("view engine", "ejs");




app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// db info
const connectOptions = {

    autoReconnect: true,
    useNewUrlParser: true
};
mongoose.connect(config.getDbConnecString(), connectOptions);
var db = mongoose.connection;
//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
});
//use sessions for tracking logins
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

setupController(app);
todoController(app);
userController(app);

// bỏ comment dòng này
require('./config/passport')(passport); // pass passport for configuration
app.listen(port, function() {
    console.log("started on port: " + port);
});
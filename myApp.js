let express = require("express");
let bodyParser = require("body-parser");
let app = express();

// --> 7)  Mount the Logger middleware here
// app.use((req, res, next) => {
//   let str = req.method + " " + req.path + " - " + req.ip;
//   console.log(str);
//   next();
// });

// --> 11)  Mount the body-parser middleware  here
app.use(bodyParser.urlencoded({extended: false}));

/** 1) Meet the node console. */
console.log("Hello World");

/** 2) A first working Express Server */
// app.get("/", (req, res) => {
//   res.send("Hello Express")
// });

/** 3) Serve an HTML file */
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

/** 4) Serve static assets  */
app.use(express.static(__dirname + "/public"));

/** 5) serve JSON on a specific route */
// let obj = {"message": "Hello json"};
// app.get("/json", (req, res) => {
//   res.json(obj);
// })

/** 6) Use the .env file to configure the app */
let obj = {"message": "Hello json"};
process.env.MESSAGE_STYLE="uppercase";

app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase"){
  obj.message = obj.message.toUpperCase();
}
  res.json(obj);
})

/** 7) Root-level Middleware - A logger */
//  place it before all the routes !

/** 8) Chaining middleware. A Time server */
app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.json({time: req.time});
});

/** 9)  Get input from client - Route parameters */
// app.get("/:word/echo", (req, res) => {
//   let word = req.params.word;
//   res.json({echo: word});
// });

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
// app.get("/name", (req, res) => {
//   let word = req.query.first + " " + req.query.last;
//   res.json({name: word});
// });
// app.route(path).get(handler).post(handler). This syntax allows you to 
// chain different verb handlers on the same path route. You can save a
// bit of typing, and have cleaner code.

/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !

/** 12) Get data form POST  */
app.post("/name", (req, res) => {
  let word = req.body.first + " " + req.body.last;
  res.json({name: word});
});

// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

module.exports = app;

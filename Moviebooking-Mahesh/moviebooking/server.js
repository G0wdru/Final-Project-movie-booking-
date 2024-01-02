const express = require("express"),
  cors = require("cors"),
  bodyParser = require("body-parser");
  require("dotenv").config();

// Running on port 9000
const PORT = process.env.PORT || 8085;

var app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

require("./routes/movie.routes")(app);
require("./routes/artist.routes")(app);
require("./routes/genre.routes")(app);
require("./routes/user.routes")(app);

app.listen(PORT, function () {
  console.log("express has started on port", PORT);
});

const express = require ('express');
const citiesRoute = require("./routes/api/cities");
const itinerariesRoute = require("./routes/api/itineraries");
const usersRoute = require("./routes/api/users");
const authRoute = require("./routes/api/auth");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();

console.log(process.env.MONGODB_USER_PASS)
mongoose.connect('mongodb+srv://' + process.env.MONGODB_USER_PASS + '@mytinerary-xlpe5.mongodb.net/MYtinerary?retryWrites=true&w=majority',
{ useNewUrlParser: true }).then(res => console.log("connected!"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use("/api/cities", citiesRoute);
app.use("/api/itineraries", itinerariesRoute);
app.use("/api/users", usersRoute);
app.use("/api/auth", authRoute);


const port = process.env.PORT || 5000;

app.listen (port, () => {
    console.log('server is running on port ' + port);
});
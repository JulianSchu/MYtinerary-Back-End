const express = require ('express');
const citiesRoute = require("./routes/api/cities");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/api/cities", citiesRoute);

const port = process.env.PORT || 5000;

// app.get('/sample', function(req, res) {
//     res.send('this is a sample!');  
// });

app.listen (port, () => {
    console.log('server is running on port' + port);
});
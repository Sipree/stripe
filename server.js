const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// Middleware
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/stripe', function(req, res){
    console.log(req.body);
    res.send('complete')
});

app.listen(5000, function(){console.log('listening on port 5000...')});

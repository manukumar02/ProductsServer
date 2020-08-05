const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const databaseConfig = require('./database');
const productRoute = require('./routes/product.route');

mongoose.Promise = global.Promise;
mongoose.connect(databaseConfig.DB, { useNewUrlParser: true }).then(() => {
    console.log('Database is connected')
}, err => {
    console.log('Failed to connect to Database' + err)
});
app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/products', productRoute);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Listening on port ' + port);
});

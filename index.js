const express = require('express');
const api = require('./src/api');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use('/api/v1', api);
app.listen(PORT, ()=> console.log(`App listening on PORT: ${PORT}`));

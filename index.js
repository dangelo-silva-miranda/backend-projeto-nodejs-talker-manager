const express = require('express');
const bodyParser = require('body-parser');

const { StatusCodes } = require('./http-status-codes');

const app = express();
app.use(bodyParser.json());

const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(StatusCodes.OK).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

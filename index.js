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

/* importação de arquivo de rotas para /talker */
const talkerRouter = require('./talkerRouter');

/* importação de arquivo de rotas para /talker */
const loginRouter = require('./loginRouter');

// - Login
app.use('/login', loginRouter);

/* Todas as rotas com /talker/<alguma-coisa> entram aqui e vão para o roteador */
app.use('/talker', talkerRouter);

app.listen(PORT, () => {
  console.log('Online');
});

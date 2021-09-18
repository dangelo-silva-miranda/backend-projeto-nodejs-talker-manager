const express = require('express');
const { StatusCodes } = require('./http-status-codes');
const connection = require('./connection');

const router = express.Router();

// - Listar talkers
router.get('/', async (_req, res) => {
  const talkers = await connection.getAll();
  
  return res.status(StatusCodes.OK).json(talkers);
});

// - Listar por ID
// - Login
// - Criar talker
// - Editar (ou modificar) talker
// - Apagar (ou deletar) talker
// - Listar por termo pesquisado no nome
module.exports = router;
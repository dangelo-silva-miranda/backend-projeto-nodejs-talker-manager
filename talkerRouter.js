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
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  
  const talkers = await connection.getAll();

  const talkerById = talkers.filter((talker) => talker.id === id);
  
  if (talkerById.length === 0) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }

  return res.status(StatusCodes.OK).json(...talkerById);
});

// - Criar talker
// - Editar (ou modificar) talker
// - Apagar (ou deletar) talker
// - Listar por termo pesquisado no nome
module.exports = router;
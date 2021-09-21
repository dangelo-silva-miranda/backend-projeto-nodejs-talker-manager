const express = require('express');
const { StatusCodes } = require('./http-status-codes');
const connection = require('./connection');
const { 
  validateToken, validateName, 
  validateAge, validateTalk, 
  validateRate, validateWatchedAt } = require('./middleware/validations');

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
router.post('/', 
  [validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  validateWatchedAt],
  async (req, res) => {
    const { name, age, talk } = req.body;
    const talkers = await connection.getAll();
    
    const newTalker = { id: talkers.length + 1, name, age, talk };
    
    await connection.saveAll([...talkers, newTalker]);

    return res.status(StatusCodes.CREATED).json(newTalker);
});

// - Editar (ou modificar) talker
router.put('/:id', 
  [validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  validateWatchedAt],
  async (req, res) => {
    const id = Number(req.params.id);
    const { name, age, talk } = req.body;
    const talkers = await connection.getAll();
    const newTalker = { id, name, age, talk };

    const index = talkers.findIndex((item) => item.id === id);
    talkers[index] = newTalker;
    // talkers.splice(index, 1, { id, name, age, talk });

    await connection.saveAll(talkers);
    return res.status(StatusCodes.CREATED).json(newTalker);
});

// - Apagar (ou deletar) talker
// - Listar por termo pesquisado no nome
module.exports = router;
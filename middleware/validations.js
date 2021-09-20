const { hasMininumSize, hasInfo, isValidPattern } = require('../helpers');
const { StatusCodes } = require('../http-status-codes');

const validateEmail = (req, res, next) => {
  const { email = '' } = req.body;

  if (!hasInfo(email)) {
    return res.status(StatusCodes.BAD_REQUEST).json({ 
      message: 'O campo "email" é obrigatório', 
    }); 
  }
  
  const emailPattern = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+(.[a-z]+)?$/i;
  if (!isValidPattern(email, emailPattern)) {
    return res.status(StatusCodes.BAD_REQUEST).json({ 
      message: 'O "email" deve ter o formato "email@email.com"', 
    });
  }

  next();
};

const validatePassword = (req, res, next) => {
  const { password = '' } = req.body;
  
  if (!hasInfo(password)) {
    return res.status(StatusCodes.BAD_REQUEST).json({ 
      message: 'O campo "password" é obrigatório', 
    });
  }

  const minimumCharacterSize = 6;
  if (!hasMininumSize(password.length, minimumCharacterSize)) {
    return res.status(StatusCodes.BAD_REQUEST).json({ 
      message: 'O "password" deve ter pelo menos 6 caracteres', 
    });
  }

  next();
};

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Token não encontrado',
    });
  }
  const minimumCharacterSize = 16;
  if (!hasMininumSize(token, minimumCharacterSize)) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Token inválido',
    });
  }

  next();
};

module.exports = {
  validateToken,
  validateEmail,
  validatePassword,
};
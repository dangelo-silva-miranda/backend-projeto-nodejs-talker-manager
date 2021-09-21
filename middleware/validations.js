const { hasMininum, hasInfo, isValidPattern } = require('../helpers');
const { StatusCodes } = require('../http-status-codes');
const connection = require('../connection');

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
  if (!hasMininum(password.length, minimumCharacterSize)) {
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
  if (token.length !== minimumCharacterSize) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Token inválido',
    });
  }

  next();
};

const validateName = (req, res, next) => {
  const { name = '' } = req.body;

  if (!hasInfo(name)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'O campo "name" é obrigatório',
    }); 
  }

  const minimumCharacterSize = 3;
  if (!hasMininum(name.length, minimumCharacterSize)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }

  next();
};

const validateAge = (req, res, next) => {
  const { age = '' } = req.body;
  
  if (!hasInfo(age)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'O campo "age" é obrigatório',
    }); 
  }

  const minimumAge = 18;
  if (!hasMininum(age, minimumAge)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'A pessoa palestrante deve ser maior de idade',
    }); 
  }

  next();
};

const validateTalk = (req, res, next) => {
  const { talk = '' } = req.body;
  
  if (!hasInfo(talk) || !hasInfo(talk.watchedAt) || !hasInfo(talk.rate)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    }); 
  }

  next();
};

const validateRate = (req, res, next) => {
  const { talk: { rate = '' } } = req.body;

  const ratePattern = /^([1-5])$/;
  if (!isValidPattern(rate, ratePattern)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }

  next();
};

/*
  Material consultado sobre regex para o formato de data dd-mm-yyyy
  https://stackoverflow.com/questions/15491894/regex-to-validate-date-format-dd-mm-yyyy-with-leap-year-support
*/
const validateWatchedAt = (req, res, next) => {
  const { talk: { watchedAt = '' } } = req.body;
  
  const watchedAtPattern = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

  if (!watchedAt.match(watchedAtPattern)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }

  next();
};

const validateSearchTerm = async (req, res, next) => {
  const { q = '' } = req.query;

  if (!hasInfo(q)) {
    const talkers = await connection.getAll();
  
    return res.status(StatusCodes.OK).json(talkers);
  }

  next();
};

module.exports = {
  validateToken,
  validateEmail,
  validatePassword,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  validateWatchedAt,
  validateSearchTerm,
};
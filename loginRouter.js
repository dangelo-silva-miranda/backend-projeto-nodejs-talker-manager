const express = require('express');

const router = express.Router();

const CryptoJS = require('crypto-js');
const { StatusCodes } = require('./http-status-codes');

const hasInfo = (field) => field && field !== '';
const isValidEmail = (email) => {
  const emailPattern = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+(.[a-z]+)?$/i;
  return emailPattern.test(email);
};

/*
Material consultado sobre validação de e-mail com regex
https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail

Material consultado sobre como testar texto com regex
https://www.w3schools.com/js/js_regexp.asp
*/
const validateEmail = (email) => {
  const message = null;

  if (!hasInfo(email)) {
    return { message: 'O campo "email" é obrigatório' }; 
  }
  
  if (!isValidEmail(email)) {
    return { message: 'O "email" deve ter o formato "email@email.com"' };
  }

  return message;
};

const validatePassword = (password, minimumCharacterSize = 6) => {
  const message = null;
  
  if (!hasInfo(password)) {
    return { message: 'O campo "password" é obrigatório' };
  }

  if (password.length < minimumCharacterSize) {
    return { message: 'O "password" deve ter pelo menos 6 caracteres' };
  }

  return message;
};

/*
  Material consultado sobre WordArray.random e Crypto-js
  https://www.davidebarranca.com/2012/10/crypto-js-tutorial-cryptography-for-dummies/
  https://help.veracode.com/r/HMAC_Signing_Example_in_Node
*/
const tokenRandomGenerator = (charactersNumber = 16) => {
  const ONE_CHARACTER_IN_BYTE = 1;
  const ONE_BYTE_IN_HEX = 2;
  const token = CryptoJS.lib.WordArray.random(
    (charactersNumber * ONE_CHARACTER_IN_BYTE) / ONE_BYTE_IN_HEX,
  ).toString();
  return token;
};

router.post('/', (req, res) => {
  const { email, password } = req.body;
  const isNotValidEmail = validateEmail(email);
  const isNotValidPassword = validatePassword(password);
  
  if (isNotValidEmail) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: isNotValidEmail.message });
  }

  if (isNotValidPassword) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: isNotValidPassword.message });
  }
  
  return res.status(StatusCodes.OK).json({ token: tokenRandomGenerator() });
});

module.exports = router;
const express = require('express');

const router = express.Router();

const CryptoJS = require('crypto-js');
const { StatusCodes } = require('./http-status-codes');
const { validateEmail, validatePassword } = require('./middleware/validations');

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

router.post('/', validateEmail, validatePassword,
  (_req, res) => res.status(StatusCodes.OK).json({ 
    token: tokenRandomGenerator() }));

module.exports = router;
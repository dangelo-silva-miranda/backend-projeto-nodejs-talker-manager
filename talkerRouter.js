const express = require('express');
const { StatusCodes } = require('./http-status-codes');

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(StatusCodes.OK).send();
});

module.exports = router;
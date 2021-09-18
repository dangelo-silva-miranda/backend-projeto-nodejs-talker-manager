const fs = require('fs').promises;
const path = require('path');

const FILE = 'talker.json';
const ENCODING = 'utf8';

/*
  Material consultado sobre pathname
  https://www.w3schools.com/nodejs/met_path_join.asp
*/
const PATHNAME = path.join(__dirname, FILE);

/*
  Material consultado sobre JSON.parse
  https://www.w3schools.com/js/js_json_parse.asp
*/
const getAll = async () => {
  try {
    const data = await fs.readFile(PATHNAME, ENCODING);
    // console.log(`Conteúdo do arquivo: ${data}`);
    return JSON.parse(data);
  } catch (err) {
    console.error(`Não foi possível ler o arquivo ${FILE} 
    no diretório ${__dirname}\n Erro: ${err.message}`);
      process.exit(1); // Encerra a execução do script e informa ao sistema operacional que houve um erro com código
  }
};

/*
  Material consultado sobre
  https://www.w3schools.com/js/js_json_stringify.asp
 */
// JSON.stringify() seguido de writeFile
const saveAll = async (dataList) => {
  try {
    const data = JSON.stringify(dataList);
    await fs.writeFile(PATHNAME, data, ENCODING);
    // console.log(`Conteúdo do arquivo salvo: ${data}`);
  } catch (err) {
    console.error(`Não foi possível escrever o arquivo ${FILE} 
    no diretório ${__dirname}\n Erro: ${err.message}`);
      process.exit(1); // Encerra a execução do script e informa ao sistema operacional que houve um erro com código
  }
};

module.exports = {
  getAll,
  saveAll,
};
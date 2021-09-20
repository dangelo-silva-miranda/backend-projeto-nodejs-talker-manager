/*
Material consultado sobre validação de e-mail com regex
https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail

Material consultado sobre como testar texto com regex
https://www.w3schools.com/js/js_regexp.asp
*/
const isValidPattern = (field, pattern) => pattern.test(field);

const hasInfo = (field) => field && field !== '';
const hasMininum = (field, minimum) => field >= minimum;

// const validateField = (field) => {
//   const message = null;
//   const { name, value } = field;
  
//   if (!hasInfo(value)) {
//     return { message: `O campo "${name}" é obrigatório` };
//   }

//   if (name !== 'email') {
//     const { restrictions: { minimumSize } } = field;
//     if (value.length < minimumSize) {
//       return { message: `O "${name}" deve ter pelo menos ${minimumSize} caracteres` };
//     }    
//   } else if (!isValidEmail(value)) {
//       return { message: 'O "email" deve ter o formato "email@email.com"' };
//     }

//   return message;
// };

module.exports = {
  hasInfo,
  hasMininum,
  isValidPattern,
  // validateField,
};
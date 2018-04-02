// cuando el archivo de la carpeta se llama index, no hace falta expecificar su nombre.

const router = require('express').Router();

router.get('/', (req, res, next) => {
  //res.send('hello world');
  res.render('index.html');
});

module.exports = router;
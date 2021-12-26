var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', async function(req, res, next) {
  const UsuarioController = require("../controllers/usuario");
  let usuarioController = new UsuarioController();
  let data = usuarioController.ingresar(req.body.correo,req.body.password);
  let response = await data.catch(err=>{
    console.log("Router response",response);
  });
  console.log("Response OK",response);
  res.render('index', { title: 'Express' });
});
router.get('/productos', function(req, res, next) {
  res.render('productos');
});
router.get('/historial', function(req, res, next) {
  res.render('productos');
});
router.get('/item', function(req, res, next) {
  res.render('item');
});
router.get('/login', function(req, res, next) {
  res.render('login');
});
router.get('/registro', function(req, res, next) {
  res.render('registro');
});
router.get('/pedidos', function(req, res, next) {
  res.render('pedidos');
});
module.exports = router;
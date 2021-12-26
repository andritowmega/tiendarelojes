var express = require('express');
var router = express.Router();
const { ensureTokenUser } = require("../libs/middleware");
/* GET home page. */
router.get('/', ensureTokenUser, async function(req, res, next) {
  const UsuarioController = require("../controllers/usuario");
  let usuarioController = new UsuarioController();
  let data = usuarioController.ingresar(req.body.correo,req.body.password);
  let response = await data.catch(err=>{
    console.log("Router response",response);
  });
  console.log("Response OK",req.body.data);
  res.render('index', { token:req.body.data });
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
router.get("/logout", function (req, res, next) {
  res.clearCookie("tokenUser");
  res.redirect("/");
});

//rutas post
router.post("/login", async function (req, res, next) {
  const UsuarioController = require("../controllers/usuario");
  let usuarioController = new UsuarioController();
  let data = usuarioController.ingresar(req.body.correo, req.body.password);
  let response = await data.catch((err) => {
    console.log("Router User Login error", err);
  });
  console.log("Response Login User", response);
  if (response) {
    res.cookie("tokenUser", response.token, { httpOnly: true });
    res.redirect("/");
  } else res.redirect("/login?msg=err");
});

module.exports = router;
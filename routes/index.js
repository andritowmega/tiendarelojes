var express = require("express");
var router = express.Router();
const { ensureTokenUser } = require("../libs/middleware");
/* GET home page. */
router.get("/", ensureTokenUser, async function (req, res, next) {
  const UsuarioController = require("../controllers/usuario");
  let usuarioController = new UsuarioController();
  let data = usuarioController.obtenerTodosLosProductos();
  let response = await data.catch((err) => {
    console.log("Router response", response);
  });
  console.log("pedidos", response);
  res.render("index", { token: req.body.data, pedidos: response });
});
router.get("/productos", ensureTokenUser, async function (req, res, next) {
  const UsuarioController = require("../controllers/usuario");
  let usuarioController = new UsuarioController();
  let data = usuarioController.obtenerTodosLosProductos();
  let response = await data.catch((err) => {
    console.log("Router response", response);
  });
  console.log("pedidos", response);
  res.render("productos", { token: req.body.data, pedidos: response });
});
router.get("/historial", ensureTokenUser, function (req, res, next) {
  res.render("productos");
});
router.get("/item", ensureTokenUser, function (req, res, next) {
  res.render("item", { token: req.body.data });
});
router.get("/login", function (req, res, next) {
  res.render("login");
});
router.get("/registro", function (req, res, next) {
  res.render("registro");
});
router.get("/pedidos", ensureTokenUser, async function (req, res, next) {
  const UsuarioController = require("../controllers/usuario");
  let usuarioController = new UsuarioController();
  let data = usuarioController.obtenerPedidos(req.body.data.id);
  let response = await data.catch((err) => {
    console.log("Router User Login error", err);
  });
  console.log("pedidos", response);
  res.render("pedidos", { token: req.body.data, pedidos: response });
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
router.post("/registro", async function (req, res, next) {
  const UsuarioController = require("../controllers/usuario");
  let usuarioController = new UsuarioController();
  let data = usuarioController.registrar(req.body);
  let response = await data.catch((err) => {
    console.log("Router User Register error", err);
  });

  if (response) res.redirect("/login?msg=ok");
  else res.redirect("/registro?msg=err");
});
router.post("/confirmarpedido/:idProducto/:idUsuario", async function (req, res, next) {
  const UsuarioController = require("../controllers/usuario");
  let usuarioController = new UsuarioController();
  let data = usuarioController.hacerPedido(req.body,req.params.idProducto,req.params.idUsuario);
  let response = await data.catch((err) => {
    console.log("Router User Register error", err);
  });
  if (response) res.redirect("/pedidos?msg=ok");
  else res.redirect("/pedidos?msg=err");
});

module.exports = router;

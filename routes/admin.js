var express = require("express");
var router = express.Router();
const AdminController = require("../controllers/admin");
let adminController = new AdminController();
const { ensureToken } = require("../libs/middleware");

router.get("/", ensureToken, async function (req, res, next) {
  let data = adminController.obtenerPedidos();
  let response = await data.catch((err) => {
    console.log("Router Admin err obtener pedidos", err);
    return null;
  });
  res.render("admin/index", { pedidos: response });
});
router.get("/productos", ensureToken, async function (req, res, next) {
  let data = adminController.obtenerProductos();
  let response = await data.catch((err) => {
    console.log("Router Admin err obtener productos", err);
    return null;
  });
  res.render("admin/productos", { productos: response });
});
router.get("/editar/:idProducto", ensureToken, async function (req, res, next) {
  let data = adminController.obtenerProductos();
  let response = await data.catch((err) => {
    console.log("Router Admin err obtener productos", err);
    return null;
  });
  res.render("admin/productos", { productos: response });
});
router.get("/login", function (req, res, next) {
  res.render("admin/login");
});
router.get("/logout", function (req, res, next) {
  res.clearCookie("tokenAdmin");
  res.redirect("/admin");
});

//rutas post
router.post("/login", async function (req, res, next) {
  let data = adminController.ingresar(req.body.correo, req.body.password);
  let response = await data.catch((err) => {
    console.log("Router Admin Login error", err);
  });
  console.log("Response Login Admin", response);
  if (response) {
    res.cookie("tokenAdmin", response.token, { httpOnly: true });
    res.redirect("/admin");
  } else res.redirect("/admin/login?msg=err");
});
router.post("/insertarProducto", async function (req, res, next) {
  let data = adminController.insertarProducto(req.body);
  let response = await data.catch((err) => {
    console.log("Router Admin insert error", err);
    return false;
  });
  if (response) res.redirect("/admin/productos");
  else res.redirect("/admin/productos?msg=err");
});
module.exports = router;

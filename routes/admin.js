var express = require("express");
var router = express.Router();
const AdminController = require("../controllers/admin");
let adminController = new AdminController();
const { ensureToken } = require("../libs/middleware");

router.get("/", ensureToken ,async function (req, res, next) {
  let data = adminController.obtenerPedidos();
  let response = await data.catch(err=>{
    console.log("Router Admin err obtener pedidos",err);
    return null;
  })
  res.render("admin/index",{pedidos:response});
});

router.get("/login",function (req, res, next) {
  res.render("admin/login");
});
router.get("/logout",function (req, res, next) {
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
  if(response) {
    res.cookie("tokenAdmin", response.token, { httpOnly: true });
    res.redirect("/admin")
  }
  else res.redirect("/admin/login?msg=err");
});
module.exports = router;
class UsuarioController {
  async ingresar(correo, password) {
    const AuthModel = require("../models/auth");
    const authModel = new AuthModel();
    const data = authModel.ingresar(correo, password);
    const response = await data.catch((err) => {
      console.log("Err User Login on Controller", err);
      return null;
    });
    if (response[0].length > 0) {
      const JWT = require("jsonwebtoken");
      let JWT_PASS_SECRET = "%%-TiendaDeRelojes-%%";
      const dataNewToken = {
        id: response[0][0].id_persona,
        nombres:
          response[0][0].nombre +
          " " +
          response[0][0].primer_apellido +
          " " +
          response[0][0].segundo_apellido,
        correo: response[0][0].correo,
      };
      const new_tokenUser = JWT.sign(dataNewToken, JWT_PASS_SECRET, {
        expiresIn: "24h",
      });
      return { response: response[0][0], token: new_tokenUser };
    }
    return null;
  }
  async obtenerPedidos(idPersona) {
    const ProductosModel = require("../models/productos");
    const productosModel = new ProductosModel();
    const data = productosModel.obtenerPedidosUsuario(idPersona);
    const response = await data.catch((err) => {
      console.log("Err User Login on Controller", err);
      return null;
    });
    if (response && response[0].length > 0) return response[0];
    return null;
  }
  async obtenerTodosLosPedidos() {
    const ProductosModel = require("../models/productos");
    const productosModel = new ProductosModel();
    const data = productosModel.obtenerPedidos();
    const response = await data.catch((err) => {
      console.log("err obtener pedidos controller", err);
      return null;
    });
    if (response && response[0].length > 0) return response[0];
    return null;
  }
  async obtenerTodosLosProductos() {
    const ProductosModel = require("../models/productos");
    const productosModel = new ProductosModel();
    const data = productosModel.obtenerProductos();
    const response = await data.catch((err) => {
      console.log("err obtener pedidos controller", err);
      return null;
    });
    if (response && response[0].length > 0) return response[0];
    return null;
  }
  async registrar(dataForm) {
    const AuthModel = require("../models/auth");
    const authModel = new AuthModel();
    const data = authModel.registrarUsuario(dataForm.nombre,dataForm.ap1,dataForm.ap2,dataForm.correo,dataForm.password);
    const response = await data.catch((err) => {
      console.log("Err User Register on Controller", err);
      return false;
    });
    return true;
  }
  async hacerPedido(dataForm,idPersona,idProducto) {
    const ProductosModel = require("../models/productos");
    const productosModel = new ProductosModel();
    const data = productosModel.insertarPedido(dataForm.telefono,dataForm.direccion,idPersona,idProducto)
    const response = await data.catch((err) => {
      console.log("err obtener pedidos controller", err);
      return false;
    });
    return true;
  }
}
module.exports = UsuarioController;

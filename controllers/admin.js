class UsuarioController {
  async ingresar(correo, password) {
    const AuthModel = require("../models/auth");
    const authModel = new AuthModel();
    const data = authModel.ingresarAdmin(correo, password);
    const response = await data.catch((err) => {
      console.log("Err Admin Login on Controller", err);
      return null;
    });
    if (response[0].length > 0) {
      const JWT = require("jsonwebtoken");
      let JWT_PASS_SECRET = "%%-TiendaDeRelojes-%%";
      const dataNewToken = {
        idadmin: response[0][0].id_admin,
        correo: response[0][0].correo,
      };
      const new_tokenUser = JWT.sign(dataNewToken, JWT_PASS_SECRET, {
        expiresIn: "24h",
      });
      return { response: response[0][0], token: new_tokenUser };
    }
    return null;
  }
  async obtenerPedidos(){
      const ProductosModel = require("../models/productos");
      const productosModel = new ProductosModel();
      const data = productosModel.obtenerPedidos();
      const response = await data.catch(err=>{
        console.log("err obtener pedidos controller", err);
        return null;
      });
      if(response && response[0].length>0)
      return response[0];
  }
  async obtenerProductos(){
    const ProductosModel = require("../models/productos");
    const productosModel = new ProductosModel();
    const data = productosModel.obtenerProductos();
    const response = await data.catch(err=>{
      console.log("err obtener productos controller", err);
      return null;
    });
    if(response && response[0].length>0)
    return response[0];
  }
  async insertarProducto(dataForm){
    const ProductosModel = require("../models/productos");
    const productosModel = new ProductosModel();
    const data = productosModel.insertarProducto(dataForm.material,dataForm.color,dataForm.precio,"r2.png",dataForm.marca,dataForm.descripcion,dataForm.cantidad);
    const response = await data.catch(err=>{
      console.log("err obtener productos controller", err);
      return false;
    });
    return response;
  }
  async obtenerProducto(idProducto) {
    const ProductosModel = require("../models/productos");
    const productosModel = new ProductosModel();
    const data = productosModel.obtenerProducto(idProducto);
    const response = await data.catch((err) => {
      console.log("err obtener pedido controller", err);
      return null;
    });
    return response[0];
  }
  async editarProducto(dataForm,idProducto) {
    const ProductosModel = require("../models/productos");
    const productosModel = new ProductosModel();
    const data = productosModel.editarProducto(dataForm.material,dataForm.color,dataForm.precio,dataForm.marca,dataForm.descripcion,idProducto);
    const response = await data.catch((err) => {
      console.log("err editar producto controller", err);
      return false;
    });
    return true;
  }
}
module.exports = UsuarioController;
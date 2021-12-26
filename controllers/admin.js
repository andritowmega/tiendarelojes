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
      const PedidosModel = require("../models/pedidos");
      const pedidosModel = new PedidosModel();
      const data = pedidosModel.obtener();
      const response = await data.catch(err=>{
        console.log("err obtener pedidos controller", err);
        return null;
      });
      if(response && response[0].length>0)
      return response[0];
  }
}
module.exports = UsuarioController;

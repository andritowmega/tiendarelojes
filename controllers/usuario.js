class UsuarioController {
  async ingresar(correo, password) {
    const AuthModel = require("../models/auth");
    const authModel = new AuthModel();
    const data = authModel.ingresar(correo, password);
    const response = await data.catch((err) => {
      console.log("Err null", err);
      return null;
    });
    return response;
  }
}
module.exports = UsuarioController;

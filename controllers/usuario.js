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
        nombres: response[0][0].nombre + " " + response[0][0].primer_apellido + " " + response[0][0].segundo_apellido,
        correo: response[0][0].correo,
      };
      const new_tokenUser = JWT.sign(dataNewToken, JWT_PASS_SECRET, {
        expiresIn: "24h",
      });
      return { response: response[0][0], token: new_tokenUser };
    }
    return null;
  }
}
module.exports = UsuarioController;

const connectionDb = require("../config/configdb");
class AuthModel{
    async ingresar(correo,password){
        const con = connectionDb().promise();
        const sql = "select * from login_sesion";
        const data = await con.query(sql);
        con.end();
        return data[0];
    }
}
module.exports = AuthModel;
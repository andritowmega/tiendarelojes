const connectionDb = require("../config/configdb");
class AuthModel{
    async ingresar(correo,password){
        const con = connectionDb().promise();
        const sql = "CALL iniciarSesion(?,?)";
        const values = [correo,password];
        const data = await con.query(sql,values);
        con.end();
        return data[0];
    }
    async ingresarAdmin(correo,password){
        const con = connectionDb().promise();
        const sql = "CALL iniciarAdmin(?,?)";
        const values = [correo,password];
        const data = await con.query(sql,values);
        con.end();
        return data[0];
    }
}
module.exports = AuthModel;
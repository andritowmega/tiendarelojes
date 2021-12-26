const connectionDb = require("../config/configdb");
class PedidosModel{
    async obtener(){
        const con = connectionDb().promise();
        const sql = "CALL obtenerPedidos()";
        const data = await con.query(sql);
        con.end();
        return data[0];
    }
}
module.exports = PedidosModel;
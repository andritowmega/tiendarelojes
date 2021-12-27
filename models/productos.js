const connectionDb = require("../config/configdb");
class ProductosModel{
    async obtenerPedidos(){
        const con = connectionDb().promise();
        const sql = "CALL obtenerPedidos()";
        const data = await con.query(sql);
        con.end();
        return data[0];
    }
    async obtenerPedidosUsuario(idPersona){
        const con = connectionDb().promise();
        const sql = "CALL obtenerPedidosUsuario(?)";
        const values = [idPersona];
        const data = await con.query(sql,values);
        con.end();
        return data[0];
    }
    async obtenerProductos(){
        const con = connectionDb().promise();
        const sql = "CALL obtenerProductos()";
        const data = await con.query(sql);
        con.end();
        return data[0];
    }
    async insertarProducto(material,color,precio,picture,marca,descripcion,cantidad){
        const con = connectionDb().promise();
        const sql = "CALL insertarProducto(?,?,?,?,?,?,?)";
        const values = [material,color,precio,picture,marca,descripcion,cantidad];
        const data = await con.query(sql,values);
        con.end();
        return true;
    }
    async insertarPedido(telefono,direccion,idPersona,idProducto){
        const con = connectionDb().promise();
        const sql = "CALL hacerPedido(?,?,?,?)";
        const values = [telefono,direccion,idPersona,idProducto];
        const data = await con.query(sql,values);
        con.end();
        return true;
    }
}
module.exports = ProductosModel;
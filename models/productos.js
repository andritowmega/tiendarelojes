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
    async editarProducto(material,color,precio,marca,descripcion,idProducto){
        const con = connectionDb().promise();
        console.log("editar",idProducto);
        const sql = "CALL update_reloj(?,?,?,?,?,?)";
        const values = [idProducto,material,color,precio,marca,descripcion];
        const data = await con.query(sql,values);
        con.end();
        return true;
    }
    async obtenerProducto(idProducto){
        const con = connectionDb().promise();
        const sql = "CALL obtenerReloj(?)";
        const values = [idProducto];
        const data = await con.query(sql,values);
        con.end();
        if(data && data[0][0]) return data[0][0];
        else return null;
    }
}
module.exports = ProductosModel;
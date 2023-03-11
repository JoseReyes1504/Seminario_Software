import express from 'express';
const router = express.Router();
import { IUsuarios } from '@server/dao/models/Usuarios/IUsuarios';
import { UsuariosDao } from '@server/dao/models/Usuarios/UsuariosDao';
import { MongoDBConn } from '@server/dao/MongoDBConn';
import { Usuarios } from '@server/libs/usuarios/usuarios';

const usuariosDao = new UsuariosDao(MongoDBConn);

let ModeloUsuario:Usuarios;
usuariosDao.init().then(() =>{
    ModeloUsuario = new Usuarios(usuariosDao);
})
  
  
router.get('/all', async (_req, res) =>{
    res.status(200).json(await ModeloUsuario.getAll());
});

//Registrar los endpoint en router 
router.get('/', (_req, res) =>{
    const jsonUrls = {
        "getAll": {"method" : "get", "url": "usuarios/all"},
        "new": {"method" : "post", "url": "usuarios/new"},
        "getById": {"method" : "post", "url": "usuarios/byid/:id"},
        "update": {"method" : "put", "url": "usuarios/upd/:id"},
        "Delete": {"method" : "delete", "url": "usuarios/del/:id"},
    }
    res.status(200).json(jsonUrls);
});

router.post('/new', async (req, res) =>{
    const {correo, nombre, password, roles } = req.body;
    const newUsuario:IUsuarios ={
        codigo: '',
        correo: correo,
        nombre: nombre,
        password: password,
        roles: roles
    }
    if(await ModeloUsuario.add(newUsuario)){
        return res.status(200).json({"created": true});    
    }
    return res.status(404).json({
        "error": "Error al agregar un nuevo usuario"
    });
});


router.put('/upd/:id', async (req, res) =>{
    const { id }  = req.params;
    const {
        correo = "---NotRecieved---",
        nombre = "---NotRecieved---",
        password = "", 
        roles= ""
    } = req.body;
    
    if(nombre === "---NotRecieved---" || correo === "---NotRecieved---" ){
        return res.status(403).json({"error":"Debe venir el nombre y correo correctos"});
    }

    const UpdateUsuario: IUsuarios = {
        codigo: id,
        correo,
        nombre,
        password,
        roles
    }

    if(await ModeloUsuario.update(id, UpdateUsuario)){
        return res.status(200).json({"Update": true});
    }
    return res.status(404).json({"Error": "Error Actualizar Usuario"});
});

export default router;
import express from 'express';

const router = express.Router();

import { IUsuarios, Usuarios } from '@server/libs/usuarios/usuarios';


const ModeloUsuario = new Usuarios();

ModeloUsuario.add({
    codigo: '',
    correo: 'eduardo.reyessuazo@gmail.com',
    nombre: 'José Eduardo Reyes Suazo',
    password: 'eduardo12345',
    roles: 'Administrador',
    creado: undefined,
    ultimoAcceso: undefined
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


router.get('/all', (_req, res) =>{
    res.status(200).json(ModeloUsuario.getAll());
});


router.post('/new', (req, res) =>{
    const {correo, nombre, password, roles } = req.body;
    const newUsuario:IUsuarios ={
        codigo: '',
        correo: correo,
        nombre: nombre,
        password: password,
        roles: roles
    }
    if(ModeloUsuario.add(newUsuario)){
        return res.status(200).json({"created": true});    
    }
    return res.status(404).json({
        "error": "Error al agregar un nuevo usuario"
    });
});


router.put('/upd/:id', (req, res) =>{
    const { id }  = req.params;
    const {correo, nombre, password, roles } = req.body;
    
    const UpdateUsuario: IUsuarios = {
        codigo: id,
        correo,
        nombre,
        password,
        roles
    }

    if(ModeloUsuario.update(UpdateUsuario)){
        return res.status(200).json({"Update": true});
    }
    return res.status(404).json({"Error": "Error Actualizar"});
});

export default router;
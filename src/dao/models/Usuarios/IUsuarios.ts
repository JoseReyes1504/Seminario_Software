export interface IUsuarios{
    codigo:string,
    correo:string, 
    nombre:string, 
    password: string,
    roles: string,
    creado?: Date,
    ultimoAcceso?: Date
}

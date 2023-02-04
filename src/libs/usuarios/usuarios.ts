export interface IUsuarios{
    codigo:string,
    correo:string, 
    nombre:string, 
    password: string,
    roles: string,
    creado?: Date,
    ultimoAcceso?: Date
}

export class Usuarios{
    private usuarios: IUsuarios[];

    constructor(){
        this.usuarios = [];
    }

    add(NuevoUsuario: IUsuarios){
        const nuevo: IUsuarios = {
            ...NuevoUsuario,
            codigo: (Math.random()*1000).toString()+new Date().getTime().toString(),
            creado: new Date(),
            ultimoAcceso: new Date(),
        }
        this.usuarios.push(nuevo);
        return true;
    }

    getAll(){
        return this.usuarios;
    }

    update(updateUsuario: IUsuarios){
        const newUsuario: IUsuarios[] = this.usuarios.map((user) =>{
            if(user.codigo === updateUsuario.codigo){
                return {...user, ...updateUsuario};
            }
            return user;
        });
        this.usuarios = newUsuario;
        return true;
    }
}
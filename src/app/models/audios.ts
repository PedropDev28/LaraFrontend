import { Usuario } from "./usuario";

export interface Audios {
    aws_object_id: string;
    usuario: Usuario;
    fecha: Date;
    duracion: number;
}

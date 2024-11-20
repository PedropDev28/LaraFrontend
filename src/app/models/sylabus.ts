import { Audios } from "./audios";
import { Usuario } from "./usuario";

export interface Sylabus {
    texto: string;
    creador: Usuario;
    tags: string[];
    audios: Audios[];
    fecha_creacion: Date;
}

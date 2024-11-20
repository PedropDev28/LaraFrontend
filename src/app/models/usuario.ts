import { Enfermedades } from "./enfermedades";

export interface Usuario {
    fecha_nacimiento: Date;
    mail: string;
    password: string;
    rol: string;
    nombre: string;
    sexo: string;
    parent: string;
    ultima_conexion: Date;
    cant_audios: number;
    provincia: string;
    enfermedades: Enfermedades[];
    dis: string;
    font_size: number;
    entidad: string;
    observaciones: string;
}

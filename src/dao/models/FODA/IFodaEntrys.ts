export enum EFodaType {
    "Fortaleza" = "Z",
    "Oportunidad" = "O",
    "Debilidad" = "D",
    "Amenaza" = "A"
}

export interface IFodaEntry{    
    foda?: string,
    descripcion?: string;
    tipo: EFodaType;
    categorias?: string[];
    valoracion?: number;
    observacion?: string;
    logs?: { fecha: Date, descripcion: string, usuario: string }[];
}

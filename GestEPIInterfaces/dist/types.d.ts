export declare enum UserType {
    ADMIN = 1,
    MANAGER = 2,
    USER = 3
}
export interface User {
    id: number;
    firstName: string;
    lastName: string;
    type: UserType;
    phone?: string;
    mail?: string;
}
export interface EPIType {
    id: string;
    label: string;
}
export interface Epi {
    id: number;
    identifiant_custom: string;
    marque: string;
    modele: string;
    numero_serie: string;
    taille?: string;
    couleur?: string;
    type_epi: string;
    periodicite_controle: string;
    date_achat: string;
    date_fabrication: string;
    date_mise_service: string;
}
export interface Controle {
    id: number;
    epi_id: number;
    date_controle: string;
    statut: string;
    commentaire: string;
    controleur: string;
}
export interface ControleWithEpi extends Controle {
    identifiant_custom: string;
    marque: string;
    modele: string;
}

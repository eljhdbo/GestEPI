// Enumération des types d'utilisateur 
export enum UserType {
  ADMIN = 1,
  MANAGER = 2,
  USER = 3,
}

// Interface utilisateur
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  type: UserType;
  phone?: string;
  mail?: string;
}

// Interface d'un type d'EPI (optionnel, selon les besoins)
export interface EPIType {
  id: string;
  label: string;
}

// Interface d'un EPI complet
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

// Interface pour les contrôles (vue simple)
export interface Controle {
  id: number;
  epi_id: number;
  date_controle: string;
  statut: string;
  commentaire: string;
  controleur: string;
}

// Interface enrichie pour la table avec données EPI
export interface ControleWithEpi extends Controle {
  identifiant_custom: string;
  marque: string;
  modele: string;
}
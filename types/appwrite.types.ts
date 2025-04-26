import { Models } from "node-appwrite";

export interface Utilisateur extends Models.Document {
    userId: string;
    nom: string;
    prenom: string;
    email: string;
    pseudo: string;
    bureau: string;
    direction: string;
    service: string;
    password: string;
}

export interface Signalement extends Models.Document {
    utilisateur: Utilisateur;
    date: Date;
    status: Status;
    panne: string;
    description: string;
    note: string;
    userId: string;
    cancellationDescription: string | null;
}
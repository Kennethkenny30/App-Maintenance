"use server";

import { AppwriteException, ID, PasswordHash, Query } from "node-appwrite";
import { parseStringify } from "../utils";
import { users,account, databases, DATABASE_ID, UTILISATEUR_COLLECTION_ID } from "../appwrite.config"; // Adjust imports as needed

// Fonction d'authentification

export const loginUser = async ({ pseudo, password }: { pseudo: string; password: string }) => {
  try {
    // Rechercher l'utilisateur par pseudo dans la base de données
    const users = await databases.listDocuments(
      DATABASE_ID!, // Remplacez par l'ID de votre base de données
      UTILISATEUR_COLLECTION_ID!, // Remplacez par l'ID de la collection utilisateur
      [Query.equal("pseudo", pseudo)]
    );

    if (users.total === 0) {
      throw new Error("Utilisateur non trouvé.");
    }

    const user = users.documents[0];

    // Vérification du mot de passe (à adapter en fonction de votre méthode de stockage de mot de passe)
    if (user.password !== password) {
      throw new Error("Mot de passe incorrect.");
    }

    // Si tout est correct, retournez l'utilisateur ou les informations nécessaires
    return user; 
  } catch (error) {
    if (error instanceof AppwriteException) {
      console.error("Erreur Appwrite :", error.message, error.code, error.type);
      throw new Error(`Erreur lors de la connexion : ${error.message}`);
    } else {
      console.error("Erreur inattendue :", error);
      throw new Error("Échec de la connexion. Veuillez vérifier vos identifiants.");
    }
  }
};




export const getUser = async (userId: string) => {
  try{
    const user = await users.get(userId);

    return parseStringify(user);
  }catch(error) {
    console.log(error)
  }
} 

export const getUtilisateur = async (userId: string) => {
  try{
    const utilisateurs = await databases.listDocuments(
      DATABASE_ID!,
      UTILISATEUR_COLLECTION_ID!,
      [
        Query.equal('userId', userId)
      ]
    );

    return parseStringify(utilisateurs.documents[0]);
  }catch(error) {
    console.log(error)
  }
} 

// CREATE APPWRITE USER & INSERT INTO DATABASE
export const inscriptionUtilisateur = async (userData: Omit<RegisterUserParams, 'userId'>) => {
  try {
    // Step 1: Check if user already exists by email
    const existingUser = await users.list([
      Query.equal('email', userData.email)
    ]);

    if (existingUser.total > 0) {
      throw new Error('Un utilisateur avec cet email existe déjà.');
    }

 // Création de l'utilisateur avec Appwrite
 const newUser = await users.create(
  ID.unique(), 
  userData.email, 
  userData.phone || undefined,
  userData.password, 
  userData.pseudo
);
    
 // Insert additional user data into your database
 await databases.createDocument(
   DATABASE_ID!,
   UTILISATEUR_COLLECTION_ID!,
   ID.unique(),
   {
     userId: newUser.$id,
     nom: userData.nom,
     prenom: userData.prenom,
     email: userData.email,
     direction: userData.direction,
     service: userData.service,
     bureau: userData.bureau,
     pseudo: userData.pseudo,
     password: userData.password 
   }
 );

 return newUser;
} catch (error: any) {
  // Gestion des erreurs
  console.error("Erreur lors de l'inscription de l'utilisateur:", error.message);
  throw new Error("Échec de l'inscription : " + error.message);
}
};




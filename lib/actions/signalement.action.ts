'use server'

import { ID } from "node-appwrite";
import { DATABASE_ID, databases, SIGNALEMENT_COLLECTION_ID } from "../appwrite.config";
import { parseStringify } from "../utils";
import { revalidatePath } from "next/cache";

export const createSignalement = async (signalement: CreateSignalementParams) => {
    try {
        // Ajouter la date et l'heure actuelles au signalement
        const dateHeureActuelle = new Date().toISOString();  // Format ISO 8601 pour une meilleure compatibilité
        const signalementAvecDate = {
            ...signalement,
            date: dateHeureActuelle  // Ajouter la date au signalement
        };

        // Créer un nouveau document dans la base de données Appwrite
        const newSignalement = await databases.createDocument(
            DATABASE_ID!,
            SIGNALEMENT_COLLECTION_ID!,
            ID.unique(),
            signalementAvecDate
        )

        // Vérifiez si le signalement a bien été créé
        if (!newSignalement) {
            throw new Error("Aucun signalement n'a été créé.");
        }

        return parseStringify(newSignalement);

    } catch (error) {
        console.log(error);
    }
}

export const getSignalement = async (signalement: CreateSignalementParams) => {
  try {
    const signalement = await databases.getDocument(
      DATABASE_ID!,
      SIGNALEMENT_COLLECTION_ID!,
      signalementId
    );
    return parseStringify(signalement);
  }catch (error) {

  }
}

export const getRecentSignalementList = async (signalement: CreateSignalementParams) => {
  try {
    const signalement = await databases.getDocument(
      DATABASE_ID!,
      SIGNALEMENT_COLLECTION_ID!,
      signalementId
    );
    return parseStringify(signalement);
  }catch (error) {

  }
}

//  UPDATE APPOINTMENT
/*export const updateAppointment = async ({
    signalementId,
    userId,
    timeZone,
    signalement,
    type,
  }: UpdateSignalementParams) => {
    try {
      // Update appointment to scheduled -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#updateDocument
      const updatedAppointment = await databases.updateDocument(
        DATABASE_ID!,
        SIGNALEMENT_COLLECTION_ID!,
        signalementId,
        signalement
      );
  
      if (!updatedAppointment) throw Error;
  
      const smsMessage = `Greetings from CarePulse. ${type === "schedule" ? 
                         `Your appointment is confirmed for ${formatDateTime(appointment.schedule!, timeZone).dateTime} with Dr. ${appointment.primaryPhysician}` : `We regret to inform that your appointment for ${formatDateTime(appointment.schedule!, timeZone).dateTime} is cancelled. Reason:  ${appointment.cancellationReason}`}.`;
      await sendSMSNotification(userId, smsMessage);
  
      revalidatePath("/admin");
      return parseStringify(updatedAppointment);
    } catch (error) {
      console.error("An error occurred while scheduling an appointment:", error);
    }
  };

function sendSMSNotification(userId: string, smsMessage: string) {
    throw new Error("Function not implemented.");
}*/

import { z } from "zod";

export const UserFormValidation = z.object({
  pseudo: z.string()
  .min(4, "Le nom d'utilisateur doit comporter au moins quatre caractères.")
  .max(50, "Le nom d'utilisateur doit comporter au plus 50 caractères.")
  .regex(
    /^(?=.*\d)[A-Z][A-Za-z0-9]{3,}$/,
    "Pseudo invalide (doit commencer par une majuscule, contenir des lettres, des chiffres, et avoir au moins quatre caractères)."
  ),

  
  password: z.string()  .min(8, 'Le mot de passe doit contenir au moins 8 caractères.')
  .max(32, 'Le mot de passe doit contenir au plus 32 caractères.')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*-])[A-Za-z\d!@#$%&*-]{8,32}$/,
    'Mot de passe incorrect (doit contenir au moins une lettre miniscule, une majuscule, un chiffre, et un carractère spécial)'
  )
})

export const InscriptionFormValidation = z.object({
  nom: z.string()
    .min(2, "Le Nom doit comporter au moins deux caractères.")
    .max(50, "Le Nom doit comporter au plus 50 caractères."),

  prenom: z.string()
    .min(2, "Le Prénom doit comporter au moins deux caractères.")
    .max(50, "Le Prénom doit comporter au plus 50 caractères."),

  email: z.string().email("Adresse email invalide."),

  direction: z.string().min(1, "Sélectionnez votre Direction."),

  service: z.string().min(1, "Sélectionnez votre Service."),

  bureau: z.string().min(1, "Entrez le numéro de votre bureau."),

  pseudo: z.string()
    .min(4, "Le nom d'utilisateur doit comporter au moins quatre caractères.")
    .max(50, "Le nom d'utilisateur doit comporter au plus 50 caractères.")
    .regex(
      /^(?=.*\d)[A-Z][A-Za-z0-9]{3,}$/,
      "Pseudo invalide (doit commencer par une majuscule, contenir des lettres, des chiffres, et avoir au moins quatre caractères)."
    ),

  password: z.string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères.')
    .max(32, 'Le mot de passe doit contenir au plus 32 caractères.')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*-])[A-Za-z\d!@#$%&*-]{8,32}$/,
      'Mot de passe incorrect (doit contenir au moins une lettre minuscule, une majuscule, un chiffre, et un caractère spécial)'
    ),
  
  confirmPassword: z.string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères.')
    .max(32, 'Le mot de passe doit contenir au plus 32 caractères.')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*-])[A-Za-z\d!@#$%&*-]{8,32}$/,
      'Mot de passe incorrect (doit contenir au moins une lettre minuscule, une majuscule, un chiffre, et un caractère spécial)'
    ),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas.',
  path: ['confirmPassword'], // Indique où l'erreur doit apparaître
});


export const CreateSignalementSchema = z.object({
  panne: z.string().min(2, "Sélectionnez au moins une panne"),
  description: z
    .string()
    .min(2, "La description doit comporter au moins 2 charactères")
    .max(500, "La description doit comporter au plus 500 charactères"),
  note: z.string().optional(),
  cancellationDescription: z.string().optional(),
});

/*export const ScheduleSignalementSchema = z.object({
  panne: z.string().min(2, "Sélectionnez au moins une panne"),
  description: z.string().optional(),
  note: z.string().optional(),
  cancellationDescription: z.string().optional(),
});*/

export const CancelSignalementSchema = z.object({
  panne: z.string().min(2, "Sélectionnez au moins une panne"),
  //schedule: z.coerce.date(),
  description: z.string().optional(),
  note: z.string().optional(),
  cancellationDescription: z
    .string()
    .min(2, "La description doit comporter au moins 2 charactères")
    .max(500, "La description doit comporter au plus 500 charactères"),
});


export function getSignalementSchema(type: string) {
  switch (type) {
    case "create":
      return CreateSignalementSchema;
    case "cancel":
      return CancelSignalementSchema;
    default:
      return CreateSignalementSchema;
  }
}


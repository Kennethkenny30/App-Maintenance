"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomFormField from "@/components/ui/CustomFormField"
import SubmitButton from "@/components/ui/SubmitButton"
import { useState } from "react"
import { InscriptionFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { inscriptionUtilisateur } from "@/lib/actions/utilisateur.actions"
import { FormFieldType } from "./FormulaireDeConnexion"
import { getUser } from "@/lib/actions/utilisateur.actions"

// Define services options
const servicesOptions: Record<'DAF' | 'DCSFM' | 'DCNSE' | 'DSDS' | 'DSIBD', string[]> = {
    DAF: ['SFCG', 'SRHAJ', 'SMLM'],
    DCSFM: ['SNPR', 'SSSC', 'SFP'],
    DCNSE: ['SCNEE', 'SSSE', 'SSC'],
    DSDS: ['SRED', 'SSSSCVP', 'SOT'],
    DSIBD: ['SIR', 'STBDG', 'SDDRU'],
};

const FormulaireDinscription = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [availableServices, setAvailableServices] = useState<string[]>([]);

    const form = useForm<z.infer<typeof InscriptionFormValidation>>({
        resolver: zodResolver(InscriptionFormValidation),
        defaultValues: {
            nom: "",
            prenom: "",
            email: "",
            direction: "",
            service: "",
            bureau: "",
            pseudo: "",
            password: "",
            confirmPassword: "", // Added confirm password field
        },
    });

    const handleDirectionChange = (selectedDirection: string) => {
        const directionKey = selectedDirection as keyof typeof servicesOptions;
        setAvailableServices(servicesOptions[directionKey] || []);
        form.setValue('service', ''); // Clear the service field when direction changes
    };
    
    async function onSubmit(values: z.infer<typeof InscriptionFormValidation>) {
        setIsLoading(true);
      
        try {
          const userData = {
            ...values,
            userId: null,
          };
      
          const utilisateur = await inscriptionUtilisateur(userData);
          
          if (utilisateur) {
            // Redirection vers la page de connexion après inscription réussie
            router.push(`/utilisateurs/${utilisateur.$id}/register`);
          }
        } catch (error) {
          console.error("Erreur lors de l'inscription:", error); // Afficher plus d'infos sur l'erreur
        }
      
        setIsLoading(false);
      }
      
    return (
        <Form {...form}>
            <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit(onSubmit)(); }} className="space-y-12 flex-1">
                <section className="space-y-6">
                    <h1 className="header">Plateforme de Maintenance Informatique</h1>
                    <p className="text-dark-700">Entrez vos informations pour vous inscrire.</p>
                </section>

                <section className="space-y-4">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Informations personnelles</h2>
                    </div>
                </section>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="nom"
                        placeholder="Doe"
                        label="Nom"
                        iconSrc="/assets/icons/user.svg"
                        iconAlt="user"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="prenom"
                        placeholder="John"
                        label="Prénom"
                        iconSrc="/assets/icons/user.svg"
                        iconAlt="user"
                    />
                </div>

                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="email"
                    placeholder="email@exemple.com"
                    label="Email"
                    iconSrc="/assets/icons/user.svg"
                    iconAlt="user"
                />

                <section className="space-y-4">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Informations professionnelles</h2>
                    </div>
                </section>

                <div className="flex flex-col gap-6 xl:flex-row">

                    <CustomFormField
                        fieldType={FormFieldType.SELECT}
                        control={form.control}
                        name="direction"
                        placeholder="Selectionner"
                        label="Direction"
                        iconSrc="/assets/icons/user.svg"
                        iconAlt="user"
                        options={Object.keys(servicesOptions)}
                        onChange={handleDirectionChange}
                    />

                    <CustomFormField
                        fieldType={FormFieldType.SELECT}
                        control={form.control}
                        name="service"
                        placeholder="Selectionner"
                        label="Service"
                        iconSrc="/assets/icons/user.svg"
                        iconAlt="user"
                        options={availableServices}
                    />
                </div>

                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="bureau"
                    placeholder="Ex:45"
                    label="Bureau"
                    iconSrc="/assets/icons/user.svg"
                    iconAlt="user"
                />

                <section className="space-y-4">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Informations de sécurité</h2>
                    </div>
                </section>

                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="pseudo"
                    placeholder="MonPseudo01"
                    label="Pseudo"
                    iconSrc="/assets/icons/user.svg"
                    iconAlt="user"
                />

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.PASSWORD_INPUT}
                        control={form.control}
                        name="password"
                        label="Mot de passe"
                        placeholder="********"
                        iconSrc="/assets/icons/password.svg"
                        iconAlt="password"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.PASSWORD_INPUT}
                        control={form.control}
                        name="confirmPassword"  // Changed to confirmPassword for clarity
                        label="Confirmer Mot de passe"
                        placeholder="********"
                        iconSrc="/assets/icons/password.svg"
                        iconAlt="password"
                    />
                </div>

                <SubmitButton isLoading={isLoading}>ENVOYER</SubmitButton>
            </form>
        </Form>
    )
}

export default FormulaireDinscription



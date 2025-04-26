"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomFormField from "@/components/ui/CustomFormField"
import SubmitButton from "@/components/ui/SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { loginUser } from "@/lib/actions/utilisateur.actions"

export enum FormFieldType{
  INPUT = 'input',
  TEXTAREA = 'textarea',
  PASSWORD = 'password',
  CHECKBOX = 'checkbox',
  DATE_PICKER = 'datePicker',
  SELECT = 'select',
  SELECT1 = 'Select',
  SKELETON = 'skeleton',
  PASSWORD_INPUT = "PASSWORD_INPUT",
  
}
 
const FormulaireDeConnexion = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      pseudo: "",
      password: "",
    },
  });

  const onSubmit = async (values: { pseudo: string, password: string }) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      console.log("Submitting form with values:", values); // Debug
      const user = await loginUser(values);

      if (user) {
        console.log("Utilisateur authentifié :", user); // Debug
        router.push(`/utilisateurs/${user.$id}/new-signalement`);
      }
    } catch (error) {
      console.error("Erreur de connexion :", error);
      setErrorMessage("Échec de la connexion. Veuillez vérifier vos identifiants.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)}  // React Hook Form gère la soumission ici
        className="space-y-6 flex-1"
      >
        <section className="mb-12 space-y-4">
          <h1 className="header"> Plateforme de Maintenance Informatique</h1>
          <p className="text-dark-700">Connectez-vous à votre compte utilisateur.</p>
        </section>
        {/* ${session.userId} */}
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="pseudo"
          label="Pseudo"
          placeholder="Exemple01"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <CustomFormField
          fieldType={FormFieldType.PASSWORD_INPUT}
          control={form.control}
          name="password"
          label="Mot de passe"
          placeholder="********"
          iconSrc="/assets/icons/password.svg"
          iconAlt="password"
        />

        <SubmitButton isLoading={isLoading}>CONNEXION</SubmitButton>
      </form>
    </Form>
  );
};


export default FormulaireDeConnexion;
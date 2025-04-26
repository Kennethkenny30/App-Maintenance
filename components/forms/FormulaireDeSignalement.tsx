"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/ui/CustomFormField";
import SubmitButton from "@/components/ui/SubmitButton";
import { Dispatch, SetStateAction, useState } from "react";
import { getSignalementSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { Pannes } from "@/constants";
import { SelectItem } from "@/components/ui/select";
import Image from "next/image";
import { createSignalement } from "@/lib/actions/signalement.action";
import { Signalement } from "@/types/appwrite.types";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PASSWORD = "password",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SELECT1 = "Select",
  SKELETON = "skeleton",
  PASSWORD_INPUT = "PASSWORD_INPUT",
}

const FormulaireDeSignalement = ({
  userId,
  utilisateurId,
  type = "create",
  signalement,
  setOpen,
}: {
  userId: string;
  utilisateurId: string;
  type: "create" | "schedule" | "cancel";
  signalement?: Signalement;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  console.log('Le formulaire de signalement est rendu.');

  const SignalementFormValidation = getSignalementSchema("type");
  console.log('Schéma de validation du formulaire initialisé:', SignalementFormValidation);

  const form = useForm<z.infer<typeof SignalementFormValidation>>({
    resolver: zodResolver(SignalementFormValidation),
    defaultValues: {
      panne: signalement ? signalement?.panne : "",
      description: signalement ? signalement.description : "",
      note: signalement?.note || "",
      cancellationDescription: signalement?.cancellationDescription || "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignalementFormValidation>) {
    setIsLoading(true);
    console.log('Soumission du formulaire commencée.');
    console.log('Valeurs soumises :', values);

    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
    }

    try {
      if (type === "create" && utilisateurId) {
        console.log('Création du signalement...');

        const dateHeureActuelle = new Date().toISOString();

        const signalementData = {
          userId,
          utilisateur: utilisateurId,
          panne: values.panne,
          description: values.description!,
          note: values.note,
          status: status as Status,
          date: dateHeureActuelle,
        };

        console.log('Données du signalement préparées :', signalementData)

        const signalement = await createSignalement(signalementData);
        console.log('Signalement créé avec succès :', signalement);

        if (signalement) {
          form.reset();
          router.push(
            `/utilisateurs/${userId}/new-signalement/success?signalementId=${signalement.id}`
          );
        }
      } /*else {
        const signalementToUpdate = {
          userId,
          signalementId: signalement?.$id!,
          signalement: {
            panne: values.panne,
            status: status as Status,
            cancellationDescription: values.cancellationDescription,
          },
          type,
        };

        const updatedSignalement = await updateSignalement(signalementToUpdate);

        if (updatedSignalement) {
          setOpen && setOpen(false);
          form.reset();
        }
      }*/
    } catch (error) {
      console.error("Erreur lors de la création du signalement :", error);
      alert("Une erreur est survenue lors de la création du signalement.");
    } finally {
      setIsLoading(false);
      console.log('Fin de la soumission du formulaire.');
    }
  }

  let buttonLabel;
  switch (type) {
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;
    case "schedule":
      buttonLabel = "Schedule Appointment";
      break;
    default:
      buttonLabel = "Submit Appointment";
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)} // React Hook Form gère la soumission ici
        className="space-y-6 flex-1"
      >
        {type === "create" && (
          <section className="mb-12 space-y-4">
            <h1 className="header">Bienvenue sur l'interface de signalement.</h1>
            <p className="text-dark-700">
              Signalez vos pannes informatiques en 10 secondes.
            </p>
          </section>
        )}
        {type !== "cancel" && (
          <>
            <CustomFormField
              fieldType={FormFieldType.SELECT1}
              control={form.control}
              name="panne"
              label="Sélection de panne"
              placeholder="Sélectionnez une panne"
            >
              {Pannes.map((panne, i) => (
                <SelectItem key={panne.name + i} value={panne.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={panne.image}
                      width={32}
                      height={32}
                      alt={panne.name}
                      className="rounded-full border border-dark-500"
                    />
                    <p>{panne.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="description"
                label="Décrivez votre panne"
                placeholder="Décrivez brièvement le problème que vous rencontrez"
              />

              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="note"
                label="Commentaire/note"
                placeholder="Laissez un commentaire (Facultatif...)"
              />
            </div>
          </>
        )}

        {type === "cancel" && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationDescription"
            label="Raison de la suppression du signalement"
            placeholder="Urgent meeting came up"
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          className={`${type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"} w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default FormulaireDeSignalement;

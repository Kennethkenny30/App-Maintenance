import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Pannes } from "@/constants";
import { getSignalement } from "@/lib/actions/signalement.action";
//import { formatDateTime } from "@/lib/utils";

const RequestSuccess = async ({
  searchParams,
  params: { userId },
}: SearchParamProps) => {
  const signalementId = (searchParams?.signalementId as string) || "";
  const signalement = await getSignalement(signalementId);

  //const panne = Pannes.find(
  //  (panne) => panne.name === signalement.panne
  //);

  return (
    <div className=" flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        {/*<Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="h-10 w-fit"
          />
        </Link>*/}

        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={350}
            width={330}
            alt="success"
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Votre <span className="text-green-500">Signalement</span> a été envoyé avec succes!
          </h2>
          <p>Un technicien interviendra sous peu, Merci de patienter.</p>
        </section>

        <section className="request-details">
          <p>Details du signalement: </p>
          <div className="flex items-center gap-3">
            <Image
              src={Pannes?.image!}
              alt="panne"
              width={100}
              height={100}
              className="size-6"
            />
            <p className="whitespace-nowrap">Panne. {Pannes?.name}</p>
          </div>
          {/*<div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            <p> {formatDateTime(appointment.schedule).dateTime}</p>
          </div>*/}
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/utilisateurs/${userId}/new-signalement`}>
            Nouveau signalement
          </Link>
        </Button>

        <p className="copyright">© 2024 Service Informatique et Réseau.</p>
      </div>
    </div>
  );
};

export default RequestSuccess;

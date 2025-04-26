import FormulaireDeSignalement from '@/components/forms/FormulaireDeSignalement'
import { getUtilisateur } from '@/lib/actions/utilisateur.actions'
import Image from 'next/image'
//import Link from 'next/link'
import React from 'react'

const Signalement = async ({params: { userId } }: SearchParamProps) => {

  const utilisateur = await getUtilisateur(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logoInstad.png"
            height={1000}
            width={1000}
            alt="logoInstad"
            className="mb-22 h-20 w-fit"
          />

          <FormulaireDeSignalement 
            type="create"
            userId={userId}
            utilisateurId={utilisateur?.$id}
          />

          <p className="copyright py-12">
            © 2024 Service Informatique et Réseau.
          </p>

        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1500}
        width={1500}
        alt="signalement"
        className="side-img  top-0 right-0 max-w-[390px] bg-bottom"
      />

    </div>
  )
}

export default Signalement
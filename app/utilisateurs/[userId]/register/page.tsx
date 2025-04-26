import Inscription from '@/app/page'
import FormulaireDeConnexion from '@/components/forms/FormulaireDeConnexion'
import { getUser } from '@/lib/actions/utilisateur.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Connexion = async ({params: { userId } }: SearchParamProps) => {

  const user = await getUser(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container ">
        <div className="sub-container max-w-[750px] flex-1 flex-col py-10">
          <Image
            src="/assets/icons/logoInstad.png"
            height={1000}
            width={1000}
            alt="logoInstad"
            className="mb-22 h-20 w-fit"
          />

          <FormulaireDeConnexion />

          <p className="mt-5"> Je ne suis pas encore inscrit, <Link href="/." className="text-green-500">
            s'inscrire</Link>.
          </p>

          <div className="text-14-regular mt-10 flex justif-between">
          
            <p className="copyright py-12">
              © 2024 Service Informatique et Réseau

              <Link href="/?admin=true" className="text-green-500">
                Admin
              </Link>
            </p>



          </div>
        </div>
      </section>

      <Image
        src="/assets/images/connexion.avif"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />

    </div>
  )
}

export default Connexion
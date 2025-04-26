import FormulaireDinscription from '@/components/forms/FormulaireDinscription'
import { getUser } from '@/lib/actions/utilisateur.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Inscription = async ({params: { userId } }: SearchParamProps) => {

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

          <FormulaireDinscription />

          <p className="mt-5"> Je suis déjà inscrit, <Link href="/utilisateurs/default/register" className="text-green-500">
            se connecter</Link>.
          </p>

          <div className="text-14-regular mt-10 flex justif-between">
          
            <p className="copyright py-12">
              © 2024 Service Informatique et Réseau
            </p>

          </div>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="connexion"
        className="side-img  top-0 right-0 max-w-[350px]"
      />

    </div>
  )
}

export default Inscription
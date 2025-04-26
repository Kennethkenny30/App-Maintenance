import Image from "next/image";
import Link from "next/link";
import { StatCard } from "@/components/StatCard";
//import { columns } from "@/components/table/columns";
//import { DataTable } from "@/components/table/DataTable";
import { getRecentSignalementList } from "@/lib/actions/signalement.action";

const AdminPage = async () => {
    const signalement = await getRecentSignalementList();
    return (
        <div className="mx-auto flex max-w-7xl flex-col space-y-8">
            <header className="admin-header">
                <Link href="/" className="cursor-pointer">
                    <Image
                        src="/assets/icons/logoInstad.png"
                        height={1000}
                        width={1000}
                        alt="logoInstad"
                        className="mb-22 h-20 w-fit"
                    />
                </Link>
        
                <p className="text-16-semibold">Tableau de bord Administrateur</p>
            </header>
    
            <main className="admin-main">

                <section className="w-full space-y-4">
                <h1 className="header">Bienvenue 👋</h1>
                <p className="text-dark-700">
                    Commencer par consulter les nouveaux signalements
                </p>
                </section>

                <section className="admin-stat">
                    <StatCard
                        type="Résolue"
                        //count={SVGAElement}//.scheduledCount
                        label="Pannes résolues"
                        icon={"/assets/icons/appointments.svg"} count={0}                    />
                    <StatCard
                        type="En attente"
                        //count={SVGAElement}//.pendingCount
                        label="Pannes en attente"
                        icon={"/assets/icons/pending.svg"} count={0}                    />
                    <StatCard
                        type="Non résolue"
                        //count={SVGAElement}//.cancelledCount
                        label="Pannes non résolues"
                        icon={"/assets/icons/cancelled.svg"} count={0}                    />
                </section>


    
            </main>
        </div>
    );
};
export default AdminPage;
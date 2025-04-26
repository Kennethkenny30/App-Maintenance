import clsx from "clsx";
import Image from "next/image";

type StatCardProps = {
  type: "Résolue" | "En attente" | "Non résolue";
  count: number;
  label: string;
  icon: string;
};

export const StatCard = ({ count = 0, label, icon, type }: StatCardProps) => {
  return (
    <div
      className={clsx("stat-card", {
        "bg-appointments": type === "Résolue",
        "bg-pending": type === "En attente",
        "bg-cancelled": type === "Non résolue",
      })}
    >
      <div className="flex items-center gap-4">
        <Image
          src={icon}
          height={32}
          width={32}
          alt="signalements"
          className="size-8 w-fit"
        />
        <h2 className="text-32-bold text-white">{count}</h2>
      </div>

      <p className="text-14-regular">{label}</p>
    </div>
  );
};

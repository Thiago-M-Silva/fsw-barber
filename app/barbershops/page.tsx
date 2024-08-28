import { redirect } from "next/navigation";

import Header from "../_components/header";
import { db } from "../_lib/prisma";
import Search from "../_components/search";
import BarbershopItem from "../_components/barbershop-item";


interface BarbershopsPageProps {
    searchParams: {
        title?: string;
        service?: string;
    };
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
    if (!searchParams) {
        return redirect("/");
    }

    const barbershops = await db.barbershop.findMany({
        where: {
            OR: [
                searchParams?.title ? {

                    name: {
                        contains: searchParams.title,
                        mode: "insensitive",
                    },

                } : {},
                searchParams.service ? {
                    services: {
                        some: {
                            name: {
                                contains: searchParams.service,
                                mode: "insensitive",
                            }
                        }
                    }
                } : {}
            ]
        },
    });

    return (
        <>
            <Header />

            <div className="px-5 py-6 flex flex-col gap-6">
                <Search />
                <h1 className="text-gray-400 font-bold text-xs uppercase">Resultados para &quot;{searchParams.title || searchParams.service}&quot;</h1>
                <div className="grid grid-cols-2 gap-4">
                    {barbershops.map((barbershop) => (
                        <div key={barbershop.id} className="w-full">
                            <BarbershopItem barbershop={barbershop} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default BarbershopsPage;

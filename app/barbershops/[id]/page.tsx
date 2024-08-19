import { Button } from "@/app/_components/ui/button"
import { db } from "@/app/_lib/prisma"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BarbershopPageProps {
    params: {
        id: string
    }
}

const BarbershopPage = async ({params}: BarbershopPageProps) => {

    const barbershop = await db.barbershop.findUnique({
        where:{
            id: params.id
        }
    })

    if(!barbershop){
        return notFound()
    }
    return (
        <div>
            {/* imagem */}
            <div className="relative h-[250px] x-full">
                <Image alt={barbershop?.name} src={barbershop?.imageUrl} fill className="objectCover"/>

                <Button size="icon" variant="secondary" className="absolute left-4 top-4" asChild>
                    <Link href="/">
                        <ChevronLeftIcon />
                    </Link>
                </Button>

                <Button size="icon" variant="secondary" className="absolute right-4 top-4">
                    <MenuIcon />
                </Button>
            </div>

            <div className="p-5">
                <h1 className="mb-3 font-bold text-xl">{barbershop?.name}</h1>
                <div className="mb-2 flex itens-center gap-1">
                    <MapPinIcon className="text-primary" size={18}/>
                    <p className="text-sm">{barbershop?.address}</p>
                </div>

                <div className="flex itens-center gap-1">
                    <StarIcon className="fill-primary text-primary" size={18}/>
                    <p className="text-sm">5,0 (899 avaliacores)</p>
                </div>
            </div>

            <div className="border-b border-solid space-y-2 p-5">
                <h2 className="font-bold uppercase text-gray-400 text-xs">Sobre Nós</h2>
                <p className="text-sm text-justify">{barbershop?.description}</p>
            </div>
        </div>
    );
}
 
export default BarbershopPage;
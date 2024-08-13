import { Barbershop } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { StarIcon } from "lucide-react";
import Image from "next/image";

interface BarbershopItemProps{
    barbershop: Barbershop
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
    return (
        <Card className="min-w-[167px] rounded-2xl">
            <CardContent className="p-0 px-2 pt-1">
                {/* imagem */}
                <div className="relative h-[159px] w-full">
                    <Image alt={barbershop.name} fill className="object-cover rounded-2xl" src={barbershop.imageUrl} />
                </div>

                <Badge className="absolute left-2 top-2" variant="secondary">
                    <StarIcon size={12} className="fill-primary text-primary"/>
                    {/* desafio, implementar sistema de rating */}
                    <p className="text-xs font-semibold">5,0</p>
                </Badge>

                <div className="px-1 py-3">
                    <h3 className="font-semibold truncate">{barbershop.name}</h3>
                    <p className="text-sm text-gray-400 truncate">{barbershop.address}</p>
                    <Button variant="secondary" className="mt-3 w-full">
                        Reservar
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
 
export default BarbershopItem;
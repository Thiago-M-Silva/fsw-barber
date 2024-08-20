import { BarbershopService } from "@prisma/client";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface ServiceItemProps {
    service: BarbershopService
}

// 50:39
const ServiceItem = ({service}: ServiceItemProps) => {
    return ( 
        <Card>
            <CardContent className="flex items-center gap-3 p-3">
                <div className="relative h-[110px] w-[110px] max-h-[110px] max-w-[110px] rounded-xl">
                    {service.imageUrl}
                </div>

                <div className="space-y-2">
                    <h3 className="font-semibold text-sm">{service.name}</h3>
                    <p className="text-sm text-gray-400">{service.description}</p>
                </div>

                <div className="flex items-center justify-between">
                    <p>
                        {Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        }).format(Number(service.price))}
                    </p>

                    <Button variant="secondary" size="sm">Reservar</Button>
                </div>
            </CardContent>
        </Card>
     );
}
 
export default ServiceItem;
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import { Card, CardContent } from "./ui/card";
import { Barbershop, BarbershopService } from "@prisma/client";

interface BookingSumaryProps {
    service: Pick<BarbershopService, "name" | "price">
    barbershop: Pick<Barbershop, "name">
    selectedDate: Date
}

const BookingSumary = ({ service, barbershop, selectedDate }: BookingSumaryProps) => {
    return (
        <div className="p5">
            <Card>
                <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                        <h2 className="font-bold">{service.name}</h2>
                        <p className="text-sm font-bold">
                            {Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            }).format(Number(service.price))}

                        </p>
                    </div>

                    <div className="flex items-center justify-between">
                        <h2 className="text-sm text-gray-400">Data</h2>
                        <p className="text-sm">
                            {format(selectedDate, "d 'de' MMMM", {
                                locale: ptBR,
                            })}
                        </p>
                    </div>

                    <div className="flex items-center justify-between">
                        <h2 className="text-sm text-gray-400">Horario</h2>
                        <p className="text-sm">
                            {format(selectedDate, "HH:mm", {
                                locale: ptBR,
                            })}
                        </p>
                    </div>

                    <div className="flex items-center justify-between">
                        <h2 className="text-sm text-gray-400">Barbearia</h2>
                        <p className="text-sm">
                            {barbershop.name}
                        </p>
                    </div>

                </CardContent>
            </Card>
        </div>
    );
}

export default BookingSumary;
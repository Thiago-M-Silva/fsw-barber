"use client"

import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Booking, Prisma } from "@prisma/client";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Sheet } from "lucide-react";
import { SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import Image from "next/image";
import PhoneItem from "./phone-item";
import { Button } from "./ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { deleteBooking } from "../_actions/delete-booking";
import { toast } from "sonner";
import { useState } from "react";
import BookingSumary from "./booking-summering";


// interface BookingItemProps {
//   booking: Prisma.BookingGetPayload<(
//     include: { service: true }
//   )>
// }
interface BookingItemProps {
  booking: {
    [x: string]: any;
    include: { service: true }
  }

}

const BookingIten = ({ booking }: BookingItemProps) => {
  // const {service: {barbershop}, } = booking
  const isConfirmed = isFuture(booking.date)
  const [isSheetsOpen, setIsSheetsOpen] = useState(false)
  const handleCancelBooking = async () => {
    try {
      await deleteBooking(booking.id)
      setIsSheetsOpen(false)
      toast.success("Reserva cancelada com sucesso!")
    } catch (error) {
      console.log(error)
      toast.error("Erro ao cancelar reserva, tente novamente!")
    }
  }

  const handleSheetIsOpenChange = (isOpen: Boolean) => {
    setIsSheetsOpen(isOpen)
  }
  return (
    <Sheet open={isSheetsOpen} onOpenChange={handleSheetIsOpenChange}>
      <SheetTrigger className="w-full min-w-[90%]">
        <Card className="min-w-[90%]">
          <CardContent className="flex justify-between p-0">
            {/* div esquerda */}
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge
                className="w-fit"
                variant={isConfirmed ? "default" : "secondary"}
              >
                {isConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>
              <h3 className="font-semibold">{booking.service.name}</h3>

              <div className="flex itens-center gap2">
                <Avatar className="h-6 w-6">
                  {/*imagem para o avatar */}
                  <AvatarImage src={booking.service.barbershop.imageUrl} />
                </Avatar>
                <p className="text-sm">{booking.service.barbershop.name}</p>
              </div>
            </div>

            {/* div direita */}
            <div className="flex flex-col items-center justify-center px-5 border-l-2 border-solid">
              <p className="text-sm capitalize">{format(booking.date, "MMMM", { locale: ptBR })}</p>
              <p className="text-2xl">{format(booking.date, "dd", { locale: ptBR })}</p>
              <p className="text-sm">{format(booking.date, "HH:mm", { locale: ptBR })}</p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>

      <SheetContent className="w-[90%]">
        <SheetHeader>
          <SheetTitle className="text-left">Informações da Reserva</SheetTitle>
        </SheetHeader>
        {/* imagem do mapa, mas talvez implementar um mapa real */}
        <div className="relative w-full h-[180px] flex items-end mt-6">
          <Image
            alt={`Mapa da barbearia ${booking.service.barbershop.name}`}
            src=""
            fill
            className="object-cover rounded-xl"
          />

          <Card className="mb-3 mx-5 z-50 w-full rounded-xl">
            <CardContent className="px-5 py-3 flex items-center gap-3">
              <Avatar>
                <AvatarImage src={booking.service.barbershop.name} />
              </Avatar>
              <div>
                <h3 className="font-bold">{booking.service.barbershop.name}</h3>
                <p className="text-xs">{booking.service.barbershop.address}</p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6">
            <Badge
              className="w-fit"
              variant={isConfirmed ? "default" : "secondary"}
            >
              {isConfirmed ? "Confirmado" : "Finalizado"}
            </Badge>


            <div className="mt-6">
              <BookingSumary
                barbershop={booking.service.barbershop}
                service={booking.service}
                selectedDate={booking.date}
              />
            </div>

            <div className="space-y-3">
              {booking.service.barbershops.phones.map((phones, index) => {
                <PhoneItem key={index} phone={phones} />
              })}
            </div>
          </div>
        </div>

        <SheetFooter>
          <div className="flex items-center-gap-3">
            <SheetClose asChild>
              <Button variant="outline" className="w-full">Voltar</Button>
            </SheetClose>
            {isConfirmed && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full">Cancelar Reserva</Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-[90%]">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Deseja cancelar sua reserva?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Tem certeza que deseja realizar o cancelamento? Essa ação e irreversivel.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <Button variant="destructive" onClick={handleCancelBooking}>Confirmar</Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default BookingIten;
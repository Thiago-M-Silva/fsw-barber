"use client"

import { Barbershop, BarbershopService, Booking } from "@prisma/client";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "./ui/sheet";
import { Calendar } from "lucide-react";
import { ptBR } from "date-fns/locale";
import { useEffect, useMemo, useState } from "react";
import { addDays, isPast, isToday, set } from "date-fns";
import { createBooking } from "../_actions/create-booking";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { getBookings } from "../_actions/get-bookings";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent } from "./ui/dialog";
import SignInDialog from "./sign-in-dialog";
import BookingSumary from "./booking-summering";
import { useRouter } from "next/navigation";


interface ServiceItemProps {
    service: BarbershopService
    barbershop: Pick<Barbershop, "name">
}

interface DateTimeListProps {
    bookings: Booking[]
    selectedDay: Date
}

const TIME_LIST = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00"
]
const getTimeList = ({ bookings, selectedDay }: DateTimeListProps) => {
    return TIME_LIST.filter(time => {
        const hour = Number(time.split(":")[0])
        const minutes = Number(time.split(":")[1])

        const timeIsOnThePast = isPast(set(new Date(), { hours: hour, minutes }))
        if (timeIsOnThePast && isToday(selectedDay)) {
            return false
        }

        const hasBookingOnCurrentTime = bookings.some((booking) =>
            booking.date.getHours() === hour &&
            booking.date.getMinutes() === minutes
        )

        if (hasBookingOnCurrentTime) {
            return false
        }
        return true
    })
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
    const { data } = useSession()
    const router = useRouter()
    const [signInDialogIsOpen, setSignInDialogIsOpen] = useState(false)
    const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
    const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)
    const [dayBookings, setDayBookings] = useState()
    const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            if (!selectedDay) return
            const bookings = await getBookings({ date: selectedDay, serviceId: service.id })
            setDayBookings(bookings)
        }
        fetch()
    }, [selectedDay, service.id])

    const handleDateSelect = (date: Date | undefined) => {
        setSelectedDay(date)
    }

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time)
    }

    const hadleCreateBooking = async () => {
        try {
            if (!selectedDate) return
            await createBooking({
                serviceId: service.id,
                userId: (data?.user as any).id,
                date: newDate
            })
            handleBookingSheetIsOpenChange()
            toast.success("Reserva criada com sucesso!", {
                action: {
                    label: 'Ver agendamentos',
                    onClick: () => router.push('/bookings')
                }
            })
        } catch (error) {
            console.log(error)
            toast.error("Erro ao criar reserva")
        }

    }

    const handlebookingClick = () => {
        if (data?.user) {
            return setBookingSheetIsOpen(true)
        }
        return setSignInDialogIsOpen(true)
    }

    const handleBookingSheetIsOpenChange = () => {
        setSelectedDay(undefined)
        setSelectedTime(undefined)
        setDayBookings([])
        setBookingSheetIsOpen(false)
    }

    const timeList = useMemo(() => {
        if (!selectedDay) return []
        return getTimeList({
            bookings: dayBookings,
            selectedDay,
        })
    }, [dayBookings, selectedDay])

    const selectedDate = useMemo(() => {
        if (!selectedDay || !selectedTime) return
        return set(selectedDay, {
            hours: Number(selectedTime?.split(":")[0]),
            minutes: Number(selectedTime?.split(":")[1]),
        })
    }, [selectedDay, selectedTime])

    return (
        <>
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

                        <Sheet open={bookingSheetIsOpen} onOpenChange={handleBookingSheetIsOpenChange}>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={handlebookingClick()}
                            >
                                Reservar
                            </Button>
                            <SheetContent className="px-0">
                                <SheetHeader>
                                    <SheetTitle>Fazer Reserva</SheetTitle>
                                </SheetHeader>

                                <div className="border-b border-solid py-5">
                                    <Calendar
                                        selected={selectedDay}
                                        onSelect={handleDateSelect}
                                        mode="single"
                                        fromDate={addDays(new Date(), 1)}
                                        styles={{
                                            head_cell: {
                                                width: "100%",
                                                textTransform: "capitalize",
                                            },
                                            cell: {
                                                width: "100%",
                                            },
                                            button: {
                                                width: "100%",
                                            },
                                            nav_button_previous: {
                                                width: "32px",
                                                height: "32px",
                                            },
                                            nav_button_next: {
                                                width: "32px",
                                                height: "32px",
                                            },
                                            caption: {
                                                textTransform: "capitalize",
                                            },
                                        }}
                                        locale={ptBR}
                                    />
                                </div>

                                {selectedDay && (
                                    <div className="flex gap-3 border-b border-solid overflow-x-auto p-5 [&::-webkit-scrollbar]:hidden">
                                        {timeList.length = 0 ? timeList.map((time) => (
                                            <Button
                                                key={time}
                                                variant={selectedTime === time ? "default" : "outline"}
                                                className="rounded-full"
                                                onClick={() => handleTimeSelect(time)}
                                            >
                                                {time}
                                            </Button>
                                        )) : (<p className="text-xs">Não há horarios disponíveis para este dia.</p>)
                                        }
                                    </div>
                                )}

                                {selectedDate && (
                                    <div className="p5">
                                        <BookingSumary
                                            barbershop={barbershop}
                                            service={service}
                                            selectedDate={selectedDate}
                                        />
                                    </div>
                                )}
                                <SheetFooter className="mt-5 px-5">
                                    <Button
                                        type="submit"
                                        onClick={hadleCreateBooking}
                                        disabled={!selectedDay || !selectedTime}
                                    >
                                        Confirmar
                                    </Button>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={signInDialogIsOpen} onOpenChange={(open) => setSignInDialogIsOpen(open)}>
                <DialogContent className="w-[90%]">
                    <SignInDialog />
                </DialogContent>
            </Dialog>
        </>
    );
}

export default ServiceItem;
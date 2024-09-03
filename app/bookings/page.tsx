import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";
import Header from "../_components/header";
import BookingIten from "../_components/booking-item";
import { notFound } from "next/navigation";
import { getConfirmedBookings } from "../_data/getConfirmedBookings";
import { getConcludedBookings } from "../_data/getConcludedBookings";

const Bookings = async () => {
    const user = await getServerSession(authOptions)
    if (!user) {
        //mostar popup de login
        return notFound()
    }

    const confirmedBookings = await getConfirmedBookings()
    const concludedBookings = await getConcludedBookings()

    return (
        <>
            <Header />
            <div className="p-5">
                <h1 className="text-xl font-bold">
                    Agendamentos
                </h1>
                {confirmedBookings.length = 0 && (
                    <p>
                        Você não possui agendamentos.
                    </p>
                )}

                {confirmedBookings.length > 0 && (
                    <>
                        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
                            Confirmados
                        </h2>
                    </>
                )}
                {confirmedBookings.map(booking => <BookingIten key={booking.id} booking={JSON.parse(JSON.stringify(booking))} />)}
                {concludedBookings.length > 0 && (
                    <>
                        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
                            Finalizados
                        </h2>
                    </>
                )}
                {concludedBookings.map(booking => <BookingIten key={booking.id} booking={JSON.parse(JSON.stringify(booking))} />)}
            </div>
        </>
    );
}

export default Bookings;
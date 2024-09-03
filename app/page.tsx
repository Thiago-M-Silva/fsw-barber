import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import { Link, SearchIcon } from "lucide-react";
import Image from "next/image";
import { db } from "./_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import { quickSearchOptions } from "./_constants/search";
import BookingIten from "./_components/booking-item";
import Search from "./_components/search";
import { getServerSession } from "next-auth";
import { authOptions } from "./_lib/auth";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import { getConfirmedBookings } from "./_data/getConfirmedBookings";

const Home = async () => {
  const session = await getServerSession(authOptions)
  //chamar o bd
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc"
    }
  })
  const confirmedBookings = getConfirmedBookings()
  return (
    <div>
      {/* Header */}
      <Header />

      <div className="p-5">
        <h2 >Olá, {session?.user ? session.user.name : "Bem Vindo"}</h2>
        <p>{format(new Date(), "EEEE, dd, MMMM", { locale: ptBR })}</p>

        <div className="mt-6">
          <Search />
        </div>

        {/* Busca rapida, pegar as imagens dos icones */}
        <div className="flex mt-6 gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button className="gap-2" variant="secondary" key={option.title} asChild>
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  width={16}
                  height={16}
                  alt={option.title}
                />
                {option.title}
              </Link>
            </Button>
          ))}
        </div>

        <div className="relative h-[150px] w-full mt-6">
          {/* pegar a imagem do banner */}
          <Image
            alt="Agende nos melhores com FSW Brber"
            src="/banner.svg"
            fill
            className="object-cover rounded-xl"
          />
        </div>

        {confirmedBookings.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Agendamentos
            </h2>
            <div className="flex overflow-x-auto gap-3 [&::-webkit-scrollbar]:hidden">
              {confirmedBookings.map(booking => <BookingIten key={booking.id} booking={JSON.parse(JSON.stringify(booking))} />)}
            </div>
          </>
        )}

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}

        </div>

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

      </div>
    </div>
  );

}

export default Home;
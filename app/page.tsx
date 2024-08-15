import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import { Card, CardContent } from "./_components/ui/card";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import { db } from "./_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import { quickSearchOptions } from "./_constants/search";
import BookingIten from "./_components/booking-item";

const Home = async () => {
  //chamar o bd
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc"
    }
  })
  return (
  <div>
    {/* Header */}
    <Header/>

    <div className="p-5">
      <h2 >Olá, Usuário</h2>
      <p>Data atual</p>

      <div className="flex itens-center gap-2 mt-6">
        <Input placeholder="Faça sua busca... "/>
        <Button size="icon">
          <SearchIcon />
        </Button>
      </div>

      {/* Busca rapida, pegar as imagens dos icones */}
      <div className="flex mt-6 gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
        {quickSearchOptions.map((option) => (
          <Button className="gap-2" variant="secondary" key={option.title}>
          <Image 
          src={option.imageUrl} 
          width={16} 
          height={16} 
          alt={option.title} 
        />
          {option.title}
        </Button>    
        ))}
      </div>

      <div className="relative h-[150px] w-full mt-6">
        {/* pegar a imagem do banner */}
        <Image
          alt="Agende nos melhores com FSW Brber"
          src=""
          fill
          className="object-cover rounded-xl"
        />
      </div>
        
      <BookingIten />

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

      <footer>
        <Card>
          <CardContent className="px-5 py-6">
            <p className="text-sm text-gray-400">
            insira aqui o texto do footer do figma <span className="font-bold">FSW Barber</span>
            </p>
          </CardContent>
        </Card>
      </footer>
    </div>
  </div>
  );

}

export default Home;
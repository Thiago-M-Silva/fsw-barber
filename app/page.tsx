import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import { SearchIcon } from "lucide-react";
import Image from "next/image";

const Home = () => {
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

      <div className="relative h-[150px] w-full mt-6">
        {/* pegar a imagem do banner */}
        <Image
          alt="Agende nos melhores com FSW Brber"
          src=""
          fill
          className="object-cover rounded-xl"
        />
      </div>
      
    </div>
  </div>
  );

}

export default Home;
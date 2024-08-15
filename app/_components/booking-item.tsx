import { Badge } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

const BookingIten = () => {
    return ( 
        <>
            
      <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
        Agendamentos
      </h2>
      <Card>
        <CardContent className="flex justify-between p-0">
          {/* div esquerda */}
          <div className="flex flex-col gap-2 py-5 pl-5">
            <Badge className="w-fit">Confirmado</Badge>
            <h3 className="font-semibold">Corte de cabelo</h3>
            
            <div className="flex itens-center gap2">
              <Avatar className="h-6 w-6">
                {/*imagem para o avatar */}
                <AvatarImage src=""/>
              </Avatar>
              <p className="text-sm">Barbearia FSW</p>
            </div>
          </div>

          {/* div direita */}
          <div className="flex flex-col items-center justify-center px-5 border-l-2 border-solid">
            <p className="text-sm">Agosto</p>
            <p className="text-2xl">05</p>
            <p className="text-sm">20:00</p>
          </div>
        </CardContent>
      </Card>
        </>
     );
}
 
export default BookingIten;
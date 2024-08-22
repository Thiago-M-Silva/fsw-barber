import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react";
import { Button } from "./ui/button"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { quickSearchOptions } from "../_constants/search";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import Image from "next/image"

const SidebarSheet = () => {
    return ( 
        // <Sheet>
        //     <SheetTrigger asChild>
        //         <Button size="icon" variant="outline">
        //             <MenuIcon />
        //         </Button>
        //     </SheetTrigger>
            <SheetContent className="overflow-y-auto">
                <SheetHeader>
                    <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>

                <div className="border-b flex itens-center border-solid py-5">
                    <Avatar>
                        <AvatarImage src=""/>
                    </Avatar>
                    <div>
                        <p className="font-bold">Thiago Marcos da Silva</p>
                        <p className="text-xs">thiago@email.com</p>
                    </div>
                </div>

                <div className="p-5 flex flex-col gap-1 border-b border-solid">
                    <SheetClose asChild>
                        <Button className="justify-start gap-2" variant="ghost" asChild>
                            <Link href="/">
                                <HomeIcon size={18} />
                                Inicio
                            </Link>
                        </Button>
                    </SheetClose>
                    <Button className="justify-start gap-2" variant="ghost">
                        <CalendarIcon size={18} />
                        Agendamentos                                
                    </Button>
                </div>

                <div className="p-5 flex flex-col gap-1 border-b border-solid">
                    {quickSearchOptions.map((option) => (
                        <Button 
                            className="justify-start gap-2" 
                            variant="ghost" 
                            key={option.title}
                        >
                            <Image 
                                src={option.imageUrl} 
                                height={18} 
                                width={18} 
                                alt={option.title} 
                            />
                            {option.title}
                        </Button>
                    ))}
                </div>
                
                <div className="flex flex-col gap-2 py-5">
                    <Button variant="ghost" className="justify-start gap-2">
                        <LogOutIcon size={18}/>
                        Sair da conta
                    </Button>
                </div>
            </SheetContent>
        // </Sheet>
     );
}
 
export default SidebarSheet;
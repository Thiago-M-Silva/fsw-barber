import Image from "next/image"
import { MenuIcon } from "lucide-react";
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Sheet, SheetTrigger } from "./ui/sheet";
import SidebarSheet from "./sidebar-sheet";

const Header = () => {
    return (
        <Card>
            <CardContent className="flex flex-row items-center justify-between p-5 ">
                {/* buscar as imagens no figma e add a pasta public*/}
                <Image alt="FSW Barber" src="" height={18} width={120}/>
                
                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="outline">
                            <MenuIcon />
                        </Button>
                    </SheetTrigger>
                    <SidebarSheet/>
                </Sheet>
            </CardContent>
        </Card>
    );   
}

export default Header;
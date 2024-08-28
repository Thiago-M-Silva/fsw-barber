"use client"

import { CalendarIcon, HomeIcon, LogOutIcon, LogInIcon } from "lucide-react";
import { Button } from "./ui/button"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { quickSearchOptions } from "../_constants/search";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "./ui/avatar";
import Link from "next/link";
import Image from "next/image"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { signIn, signOut, useSession } from "next-auth/react";

const SidebarSheet = () => {
    const { data } = useSession()
    const handleLoginWithGoogleClick = () => signIn("google")
    const handleLogoutClick = () => signOut()

    return (
        <SheetContent className="overflow-y-auto">
            <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>

            <div className="border-b justify-between flex itens-center border-solid py-5">

                {data?.user ? (
                    <div>
                        <Avatar>
                            <AvatarImage src={data?.user?.image || " "} />
                        </Avatar>
                        <div>
                            <p className="font-bold">{data.user.name}</p>
                            <p className="text-xs">{data.user.email}</p>
                        </div>
                    </div>
                ) : (
                    <>
                        <h2 className="font-bold">Ola, faça seu login</h2>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size="icon">
                                    <LogInIcon />
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Faça login na plataforma</DialogTitle>
                                        <DialogDescription>
                                            Conecte-se usando sua conta do google
                                        </DialogDescription>
                                    </DialogHeader>
                                    <Button onClick={handleLoginWithGoogleClick} variant="outline" className="gap-1 font-bold">
                                        {/* exportar o icone do google para public > icons */}
                                        <Image src="a" alt="login com o google" width={18} height={18} />
                                        Google
                                    </Button>
                                </DialogContent>
                            </DialogContent>
                        </Dialog>
                    </>
                )}
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
                    <SheetClose key={option.title} asChild>
                        <Button
                            className="justify-start gap-2"
                            variant="ghost"
                            asChild
                        >
                            <Link href={`/barbershops?service=${option.title}`}>
                                <Image
                                    src={option.imageUrl}
                                    height={18}
                                    width={18}
                                    alt={option.title}
                                />
                                {option.title}
                            </Link>
                        </Button>
                    </SheetClose>
                ))}
            </div>

            <div className="flex flex-col gap-2 py-5">
                <Button onClick={handleLogoutClick} variant="ghost" className="justify-start gap-2">
                    <LogOutIcon size={18} />
                    Sair da conta
                </Button>
            </div>
        </SheetContent>
    );
}

export default SidebarSheet;
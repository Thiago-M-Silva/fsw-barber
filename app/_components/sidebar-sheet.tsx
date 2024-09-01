"use client"

import { CalendarIcon, HomeIcon, LogOutIcon, LogInIcon } from "lucide-react";
import { Button } from "./ui/button"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { quickSearchOptions } from "../_constants/search";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "./ui/avatar";
import Link from "next/link";
import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { signIn, signOut, useSession } from "next-auth/react";
import SignInDialog from "./sign-in-dialog";

const SidebarSheet = () => {
    const { data } = useSession()
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
                            <DialogContent className="w-[90%]">
                                <SignInDialog />
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
                <Button className="justify-start gap-2" variant="ghost" asChild>
                    <Link href="/bookings">
                        <CalendarIcon size={18} />
                        Agendamentos
                    </Link>
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

            {data?.user && (
                <div className="flex flex-col gap-2 py-5">
                    <Button onClick={handleLogoutClick} variant="ghost" className="justify-start gap-2">
                        <LogOutIcon size={18} />
                        Sair da conta
                    </Button>
                </div>
            )}
        </SheetContent>
    );
}

export default SidebarSheet;
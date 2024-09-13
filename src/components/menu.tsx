"use client"

import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./ui/sheet"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "./ui/button"
import { quickSearchOptions } from "@/constants/search"
import { ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog"
import { signIn, signOut, useSession } from "next-auth/react"

type MenuProps = {
    trigger: ReactNode
}

const Menu = ({ trigger }: MenuProps) => {
    const handleLoginWithGoogle = async () => {
        await signIn("google")
    }
    const handleLogout = async () => {
        await signOut()
    }

    const { data } = useSession()

    return (
        <>
            <Sheet>
                <SheetTrigger asChild>{trigger}</SheetTrigger>
                <SheetContent className="overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle className="text-left">Menu</SheetTitle>
                    </SheetHeader>

                    {data?.user ? (
                        <div className="flex items-center gap-4 border-b border-solid py-5">
                            <Avatar className="h-12 w-12 border-2 border-primary">
                                <AvatarImage src={data.user.image ?? ""} />
                            </Avatar>
                            <div>
                                <p className="truncate text-ellipsis font-bold">
                                    {data.user.name}
                                </p>
                                <p className="text-xs">{data.user.email}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between gap-4 border-b border-solid py-5">
                            <h2 className="text-lg font-bold">
                                Olá, faça seu login
                            </h2>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button>
                                        <LogInIcon />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="w-11/12">
                                    <DialogHeader>
                                        <DialogTitle>
                                            Faça seu login na plataforma
                                        </DialogTitle>
                                        <DialogDescription>
                                            Conecte-se usando a sua conta do
                                            Google
                                        </DialogDescription>
                                    </DialogHeader>
                                    <Button
                                        variant="outline"
                                        className="gap-2 font-bold"
                                        onClick={handleLoginWithGoogle}
                                    >
                                        <Image
                                            src="/google.svg"
                                            alt="Fazer login com o Google"
                                            width={18}
                                            height={18}
                                        />
                                        Google
                                    </Button>
                                </DialogContent>
                            </Dialog>
                        </div>
                    )}

                    <div className="flex flex-col gap-1 border-b border-solid py-5">
                        <SheetClose asChild>
                            <Button
                                variant="ghost"
                                className="justify-start gap-2"
                                asChild
                            >
                                <Link href="/">
                                    <HomeIcon size={18} />
                                    Início
                                </Link>
                            </Button>
                        </SheetClose>
                        <SheetClose asChild>
                            <Button
                                variant="ghost"
                                className="justify-start gap-2"
                                asChild
                            >
                                <Link href="/">
                                    <CalendarIcon size={18} />
                                    Agendamento
                                </Link>
                            </Button>
                        </SheetClose>
                    </div>

                    <div className="flex flex-col gap-1 border-b border-solid py-5">
                        {quickSearchOptions.map((option) => {
                            return (
                                <SheetClose asChild key={option.title}>
                                    <Button
                                        variant="ghost"
                                        className="justify-start gap-2"
                                        asChild
                                    >
                                        <Link
                                            href={`/barbershops?service=${option.title}`}
                                        >
                                            <Image
                                                src={option.imageUrl}
                                                alt={option.title}
                                                width={16}
                                                height={16}
                                            />
                                            {option.title}
                                        </Link>
                                    </Button>
                                </SheetClose>
                            )
                        })}
                    </div>

                    <div className="flex flex-col gap-1 py-5">
                        <Button
                            variant="ghost"
                            className="justify-start gap-2"
                            onClick={handleLogout}
                        >
                            <LogOutIcon size={18} />
                            Sair da conta
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    )
}

export default Menu

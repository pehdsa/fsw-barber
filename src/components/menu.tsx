"use client"

import { CalendarIcon, HomeIcon, LogOutIcon } from "lucide-react"
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
import { ReactElement } from "react"
import Link from "next/link"
import Image from "next/image"

type MenuProps = {
    trigger: ReactElement
}

const Menu = ({ trigger }: MenuProps) => {
    return (
        <Sheet>
            <SheetTrigger asChild>{trigger}</SheetTrigger>
            <SheetContent className="overflow-y-auto">
                <SheetHeader>
                    <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>

                <div className="flex items-center gap-4 border-b border-solid py-5">
                    <Avatar className="h-12 w-12 border-2 border-primary">
                        <AvatarImage src="https://avatars.githubusercontent.com/u/3328835?v=4" />
                    </Avatar>
                    <div>
                        <p className="font-bold">Pedro Henrique</p>
                        <p className="text-xs">pedro@email.com</p>
                    </div>
                </div>

                <div className="flex flex-col gap-1 border-b border-solid py-5">
                    <SheetClose asChild>
                        <Button className="justify-start gap-2" asChild>
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
                                    <Link href="/">
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
                    <Button variant="ghost" className="justify-start gap-2">
                        <LogOutIcon size={18} />
                        Sair da conta
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default Menu

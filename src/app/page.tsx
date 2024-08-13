import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"
import Header from "@/components/header"
import BarberShopItem from "@/components/barbershop-item"
import Image from "next/image"
import { db } from "@/lib/prisma"

const Home = async () => {
    const barbershops = await db.barbershop.findMany({})
    console.log(barbershops)

    return (
        <div>
            <Header />
            <div className="py-5">
                <section className="px-5 pb-6">
                    <h2 className="text-xl font-bold">olá, Pedro</h2>
                    <p>Sexta, 2 de agosto</p>
                </section>

                <div className="flex items-center gap-2 px-5 pb-6">
                    <Input placeholder="Faça sua busca..." />
                    <Button size="icon">
                        <SearchIcon />
                    </Button>
                </div>

                <section className="relative mb-6 h-[150px] w-full px-5">
                    <Image
                        alt="Banner"
                        src="/banner_1.svg"
                        fill
                        className="rounded-xl object-contain"
                    />
                </section>

                <section className="px-5 pb-6">
                    <h3 className="pb-3 text-xs font-bold uppercase text-gray-400">
                        Agendamento
                    </h3>
                    <Card>
                        <CardContent className="flex justify-between p-0">
                            <div className="flex flex-col gap-2.5 p-5">
                                <Badge className="w-fit">Confirmado</Badge>
                                <h4 className="font-semibold">
                                    Corte de Cabelo
                                </h4>
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6">
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <p className="text-sm">Vintage Barber</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center border-l px-5">
                                <p className="text-sm">Fevereiro</p>
                                <p className="text-2xl">06</p>
                                <p className="text-sm">09:45</p>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                <section>
                    <h3 className="px-5 pb-3 text-xs font-bold uppercase text-gray-400">
                        Recomendados
                    </h3>
                    <div className="flex gap-3 overflow-auto px-5 [&::-webkit-scrollbar]:hidden">
                        {barbershops.map((item) => (
                            <BarberShopItem barbershop={item} key={item.id} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Home

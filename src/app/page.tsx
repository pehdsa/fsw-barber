import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"
import Image from "next/image"
import Header from "@/components/header"
import BarberShopItem from "@/components/barbershop-item"
import BookingItem from "@/components/booking-item"
import { quickSearchOptions } from "@/constants/search"
import { db } from "@/lib/prisma"

const Home = async () => {
    const barbershops = await db.barbershop.findMany({})
    const popularBarberShop = await db.barbershop.findMany({
        orderBy: {
            name: "desc",
        },
    })

    return (
        <div>
            <Header />
            <div className="py-5">
                <section className="px-5 pb-6">
                    <h2 className="text-xl font-bold">olá, Pedro</h2>
                    <p>Sexta, 2 de agosto</p>
                </section>

                <section className="flex items-center gap-2 px-5 pb-6">
                    <Input placeholder="Faça sua busca..." />
                    <Button size="icon">
                        <SearchIcon />
                    </Button>
                </section>

                <section className="pb-6">
                    <div className="flex gap-2 overflow-auto px-5 [&::-webkit-scrollbar]:hidden">
                        {quickSearchOptions.map((option) => (
                            <Button
                                className="gap-2"
                                key={option.title}
                                variant="secondary"
                            >
                                <Image
                                    src={option.imageUrl}
                                    alt={option.title}
                                    width={16}
                                    height={16}
                                />
                                <p className="text-sm font-bold text-white">
                                    {option.title}
                                </p>
                            </Button>
                        ))}
                    </div>
                </section>

                <section className="relative mb-6 w-full px-5">
                    <div className="relative h-[150px] w-full">
                        <Image
                            alt="Banner"
                            src="/banner_1.svg"
                            fill
                            className="rounded-xl object-contain"
                        />
                    </div>
                </section>

                <section className="px-5 pb-6">
                    <h3 className="pb-3 text-xs font-bold uppercase text-gray-400">
                        Agendamento
                    </h3>
                    <BookingItem />
                </section>

                <section className="pb-6">
                    <h3 className="px-5 pb-3 text-xs font-bold uppercase text-gray-400">
                        Recomendados
                    </h3>
                    <div className="flex gap-3 overflow-auto px-5 [&::-webkit-scrollbar]:hidden">
                        {barbershops.map((item) => (
                            <BarberShopItem barbershop={item} key={item.id} />
                        ))}
                    </div>
                </section>

                <section className="pb-6">
                    <h3 className="px-5 pb-3 text-xs font-bold uppercase text-gray-400">
                        Populares
                    </h3>
                    <div className="flex gap-3 overflow-auto px-5 [&::-webkit-scrollbar]:hidden">
                        {popularBarberShop.map((item) => (
                            <BarberShopItem barbershop={item} key={item.id} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Home

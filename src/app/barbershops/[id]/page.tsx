import Menu from "@/components/menu"
import PhoneItem from "@/components/phone-item"
import ServiceItem from "@/components/service-item"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/prisma"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

type BarberShopsType = {
    params: {
        id: string
    }
}

const BarberShopPage = async ({ params }: BarberShopsType) => {
    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id,
        },
        include: {
            services: true,
        },
    })

    if (!barbershop) {
        return notFound()
    }

    return (
        <div className="relative">
            <div className="absolute z-10 flex w-full items-center justify-between p-5">
                <Button variant="secondary" size="icon" asChild>
                    <Link href="/">
                        <ChevronLeftIcon />
                    </Link>
                </Button>
                <Menu
                    trigger={
                        <Button variant="secondary" size="icon">
                            <MenuIcon />
                        </Button>
                    }
                />
            </div>

            <div className="relative h-[250px] w-full">
                <Image
                    src={barbershop?.imageUrl}
                    alt=""
                    fill
                    className="object-cover"
                />
            </div>

            <div className="border-b p-5">
                <h1 className="mb-3 text-xl font-bold">{barbershop?.name}</h1>
                <div className="space-y-2 pb-2">
                    <div className="flex items-center gap-1">
                        <MapPinIcon className="text-primary" size={18} />
                        <p className="text-sm">{barbershop?.address}</p>
                    </div>
                    <div className="flex items-center gap-1">
                        <StarIcon
                            className="fill-primary text-primary"
                            size={18}
                        />
                        <p className="text-sm">5,0 (499 avaliações)</p>
                    </div>
                </div>
            </div>

            <div className="space-y-3 border-b p-5">
                <h2 className="text-xs font-bold uppercase text-gray-400">
                    SOBRE NÓS
                </h2>
                <p className="text-justify text-sm">
                    {barbershop?.description}
                </p>
            </div>

            <div className="space-y-3 border-b border-solid p-5">
                <h2 className="text-xs font-bold uppercase text-gray-400">
                    SERVIÇOS
                </h2>
                {barbershop.services.map((service) => {
                    return (
                        <ServiceItem
                            key={service.id}
                            service={service}
                            barbershop={barbershop}
                        />
                    )
                })}
            </div>

            <div className="space-y-3 p-5">
                <h2 className="text-xs font-bold uppercase text-gray-400">
                    CONTATO
                </h2>
                {barbershop.phones.map((phone) => {
                    return <PhoneItem key={phone} phone={phone} />
                })}
            </div>
        </div>
    )
}

export default BarberShopPage

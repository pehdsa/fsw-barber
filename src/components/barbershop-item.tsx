import Image from "next/image"
import { Barbershop } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { StarIcon } from "lucide-react"

type BarbershopItemType = {
    barbershop: Barbershop
}

const BarberShopItem = ({ barbershop }: BarbershopItemType) => {
    return (
        <Card className="min-w-[200px] rounded-xl p-2">
            <CardContent className="flex h-full flex-col p-0">
                <div className="relative h-[159px] w-full">
                    <Image
                        src={barbershop.imageUrl}
                        alt={barbershop.name}
                        className="rounded-xl object-cover"
                        fill
                    />

                    <Badge
                        className="absolute left-2 top-2 space-x-1"
                        variant="secondary"
                    >
                        <StarIcon
                            size={12}
                            className="fill-primary text-primary"
                        />
                        <p className="text-xs font-semibold">5,0</p>
                    </Badge>
                </div>

                <div className="flex-grow py-3">
                    <h3 className="font-semibold">{barbershop.name}</h3>
                    <p className="text-sm text-gray-400">
                        {barbershop.address}
                    </p>
                </div>

                <Button variant="secondary" className="mt-3 w-full">
                    Reservar
                </Button>
            </CardContent>
        </Card>
    )
}

export default BarberShopItem

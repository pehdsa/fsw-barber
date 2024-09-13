import BarberShopItem from "@/components/barbershop-item"
import Header from "@/components/header"
import Search from "@/components/search"
import { db } from "@/lib/prisma"

type BarberShopsPageProps = {
    searchParams: {
        title?: string
        service?: string
    }
}

const BarberShopsPage = async ({ searchParams }: BarberShopsPageProps) => {
    const barbershops = await db.barbershop.findMany({
        where: {
            OR: [
                searchParams.title
                    ? {
                          name: {
                              contains: searchParams.title,
                              mode: "insensitive",
                          },
                      }
                    : {},
                searchParams.service
                    ? {
                          services: {
                              some: {
                                  name: {
                                      contains: searchParams.service,
                                      mode: "insensitive",
                                  },
                              },
                          },
                      }
                    : {},
            ],
        },
    })

    return (
        <div>
            <Header />
            <div className="my-6">
                <Search />
            </div>
            <h2 className="px-5 pb-3 text-xs font-bold uppercase text-gray-400">
                Resultados para &quot;
                {searchParams.title || searchParams.service}&quot;
            </h2>
            <div className="grid grid-cols-2 gap-4 px-5">
                {barbershops.map((item) => (
                    <BarberShopItem barbershop={item} key={item.id} />
                ))}
            </div>
        </div>
    )
}

export default BarberShopsPage

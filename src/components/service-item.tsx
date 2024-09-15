"use client"
import { Barbershop, BarbershopService } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./ui/sheet"
import { Calendar } from "./ui/calendar"
import { ptBR } from "date-fns/locale"
import { useState } from "react"
import { format, set } from "date-fns"
import { createBooking } from "@/actions/create-booking"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

type ServiceItemProps = {
    service: BarbershopService
    barbershop: Pick<Barbershop, "name">
}

const TIME_LIST = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
]

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
    const { data } = useSession()
    const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
    const [selectedTime, setSelectedTime] = useState<string | undefined>(
        undefined,
    )

    const handleDateSelect = (date: Date | undefined) => {
        setSelectedDay(date)
    }

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time)
    }

    const handleCreateBooking = async () => {
        try {
            if (!selectedDay || !selectedTime) return

            const hour = Number(selectedTime?.split(":")[0])
            const minutes = Number(selectedTime?.split(":")[1])
            const newDate = set(selectedDay, {
                minutes: minutes,
                hours: hour,
            })
            await createBooking({
                serviceId: service.id,
                userId: (data?.user as any).id,
                date: newDate,
            })
            toast.success("Reserva criada com sucesso")
        } catch (err) {
            console.error("[SERVICE-ITEM][HANDLECREATEBOOKING] error", err)
            toast.error("Erro ao criar reserva")
        } finally {
        }
    }

    return (
        <Card>
            <CardContent className="flex items-center gap-3 p-3">
                <div className="relative h-[110px] w-[110px] overflow-hidden rounded-md">
                    <Image
                        src={service.imageUrl}
                        alt={service.name}
                        fill
                        className="absolute h-full w-full object-cover"
                    />
                </div>
                <div className="flex-1 space-y-2">
                    <h3 className="text-sm font-semibold">{service.name}</h3>
                    <p className="text-sm text-gray-500">
                        {service.description}
                    </p>
                    <div className="flex w-full items-center justify-between">
                        <p className="text-sm font-bold text-primary">
                            {Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            }).format(Number(service.price))}
                        </p>

                        {data?.user && (
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="secondary" size="sm">
                                        Reservar
                                    </Button>
                                </SheetTrigger>
                                <SheetContent className="overflow-y-auto px-0">
                                    <SheetHeader className="border-b px-5 pb-5 text-left">
                                        <SheetTitle>Fazer Reserva</SheetTitle>
                                    </SheetHeader>

                                    <div className="border-b border-solid py-5">
                                        <Calendar
                                            selected={selectedDay}
                                            onSelect={handleDateSelect}
                                            locale={ptBR}
                                            mode="single"
                                            styles={{
                                                head_cell: {
                                                    width: "100%",
                                                    textTransform: "capitalize",
                                                },
                                                cell: {
                                                    width: "100%",
                                                },
                                                button: {
                                                    width: "100%",
                                                },
                                                nav_button_previous: {
                                                    width: "32px",
                                                    height: "32px",
                                                },
                                                nav_button_next: {
                                                    width: "32px",
                                                    height: "32px",
                                                },
                                                caption: {
                                                    textTransform: "capitalize",
                                                },
                                            }}
                                        />
                                    </div>

                                    {selectedDay && (
                                        <div className="flex gap-3 overflow-auto border-b p-5 [&::-webkit-scrollbar]:hidden">
                                            {TIME_LIST.map((time) => (
                                                <Button
                                                    variant={
                                                        selectedTime == time
                                                            ? "default"
                                                            : "outline"
                                                    }
                                                    className="rounded-full"
                                                    key={time}
                                                    onClick={() =>
                                                        handleTimeSelect(time)
                                                    }
                                                >
                                                    {time}
                                                </Button>
                                            ))}
                                        </div>
                                    )}

                                    {selectedTime && selectedDay && (
                                        <div className="px-5 py-5">
                                            <Card className="p-3">
                                                <CardContent className="space-y-3 p-0">
                                                    <div className="flex items-center justify-between">
                                                        <h2 className="font-bold">
                                                            {service.name}
                                                        </h2>
                                                        <p className="text-sm font-bold">
                                                            {Intl.NumberFormat(
                                                                "pt-BR",
                                                                {
                                                                    style: "currency",
                                                                    currency:
                                                                        "BRL",
                                                                },
                                                            ).format(
                                                                Number(
                                                                    service.price,
                                                                ),
                                                            )}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <h2 className="text-sm text-gray-400">
                                                            Data
                                                        </h2>
                                                        <p className="text-sm">
                                                            {format(
                                                                selectedDay,
                                                                "d 'de' MMMM",
                                                                {
                                                                    locale: ptBR,
                                                                },
                                                            )}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <h2 className="text-sm text-gray-400">
                                                            Horário
                                                        </h2>
                                                        <p className="text-sm">
                                                            {selectedTime}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <h2 className="text-sm text-gray-400">
                                                            Local
                                                        </h2>
                                                        <p className="text-sm">
                                                            {barbershop.name}
                                                        </p>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    )}
                                    <SheetFooter className="mt-5 px-5">
                                        <SheetClose asChild>
                                            <Button
                                                type="submit"
                                                onClick={handleCreateBooking}
                                                disabled={
                                                    !selectedDay ||
                                                    !selectedTime
                                                }
                                            >
                                                Confirmar
                                            </Button>
                                        </SheetClose>
                                    </SheetFooter>
                                </SheetContent>
                            </Sheet>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default ServiceItem

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const BookingItem = () => {
    return (
        <Card>
            <CardContent className="flex justify-between p-0">
                <div className="flex flex-col gap-2.5 p-5">
                    <Badge className="w-fit">Confirmado</Badge>
                    <h4 className="font-semibold">Corte de Cabelo</h4>
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
    )
}

export default BookingItem

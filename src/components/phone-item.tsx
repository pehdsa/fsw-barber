"use client"
import { SmartphoneIcon } from "lucide-react"
import { Button } from "./ui/button"
import { toast } from "sonner"

const PhoneItem = ({ phone }: { phone: string }) => {
    const copyPhone = (phone: string) => {
        navigator.clipboard.writeText(phone)
        toast.success("Telefone copiado com sucesso")
    }

    return (
        <div className="flex justify-between">
            <div className="flex items-center gap-3">
                <SmartphoneIcon />
                <p className="text-sm">{phone}</p>
            </div>
            <Button
                onClick={() => copyPhone(phone)}
                variant="outline"
                size="sm"
            >
                Copiar
            </Button>
        </div>
    )
}

export default PhoneItem

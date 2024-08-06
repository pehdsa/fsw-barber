import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"
import Image from "next/image"

export default function Home() {
    return (
        <div>
            <Header />
            <div className="p-5">
                <div className="pb-6">
                    <h2 className="text-xl font-bold">olá, Pedro</h2>
                    <p>Sexta, 2 de agosto</p>
                </div>

                <div className="flex items-center gap-2 pb-6">
                    <Input placeholder="Faça sua busca..." />
                    <Button size="icon">
                        <SearchIcon />
                    </Button>
                </div>

                <div className="relative h-[150px] w-full">
                    <Image
                        alt="Banner"
                        src="/banner_1.svg"
                        fill
                        className="rounded-xl object-contain"
                    />
                </div>
            </div>
        </div>
    )
}

"use client"
import { SearchIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
    search: z.string().trim().min(2, {
        message: "Digite algo para buscar",
    }),
})

const Search = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: "",
        },
    })
    const router = useRouter()

    const handleSubmit = (data: z.infer<typeof formSchema>) => {
        router.push(`/barbershops?title=${data.search}`)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex gap-2 px-5"
            >
                <FormField
                    control={form.control}
                    name="search"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <Input
                                    placeholder="Faça sua busca..."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" size="icon">
                    <SearchIcon />
                </Button>
            </form>
        </Form>
        // <form ref={form} onSubmit={handleSubmit} className="flex items-center gap-2 px-5">
        //     <Input
        //         placeholder="Faça sua busca..."
        //         value={search}
        //         onChange={(e) => setSearch(e.target.value)}
        //     />
        //     <Button type="submit" size="icon">
        //         <SearchIcon />
        //     </Button>
        // </form>
    )
}

export default Search

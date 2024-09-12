import { Card, CardContent } from "./ui/card"

const Footer = () => {
    return (
        <footer>
            <Card className="rounded-none">
                <CardContent className="px-5 py-6">
                    <p className="text-sm font-semibold text-gray-400">
                        © 2024 Copyright FSW Barber
                    </p>
                </CardContent>
            </Card>
        </footer>
    )
}

export default Footer

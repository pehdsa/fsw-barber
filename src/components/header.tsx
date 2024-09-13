import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { MenuIcon } from "lucide-react"
import Menu from "./menu"
import Link from "next/link"

const Header = () => {
    return (
        <header>
            <Card>
                <CardContent className="flex items-center justify-between p-5">
                    <Link href="/">
                        <Image
                            alt="FSW BArber"
                            src="/logo.svg"
                            width={120}
                            height={18}
                        />
                    </Link>

                    <Menu
                        trigger={
                            <Button variant="outline" size="icon">
                                <MenuIcon />
                            </Button>
                        }
                    />
                </CardContent>
            </Card>
        </header>
    )
}

export default Header

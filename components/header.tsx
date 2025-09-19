
import { HeaderLogo } from "@/components/header-logo"
import { Navigation } from "@/components/navigation"
import { UserButton, ClerkLoaded, ClerkLoading } from "@clerk/nextjs"
<<<<<<< HEAD
import { Loader2 } from "lucide-react"
=======
import {  Loader2 } from "lucide-react"
>>>>>>> e6f2f87244a51c1d1a44ec697a6d2203f5c9652a
import { WelcomeMsg } from "@/components/welcome-msg"
import { Filters } from "@/components/filters"
export const Header = () => {
        return (
                <header className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8:px-14 pb-36">
                <div className="max-w-screen-2xl mx-auto">
                <div className="w-full flex items-center justify-between mb-14">
                        <div className="flex items-center lg:gap-x-16">
                        <HeaderLogo />
                        <Navigation />
                        </div>
                        <ClerkLoaded>
                                <UserButton afterSwitchSessionUrl="/" />
                        </ClerkLoaded>
                        <ClerkLoading>
                                <Loader2 className="size-8 animate-spin text-slate-400"/>
                        </ClerkLoading>

                </div>
                <WelcomeMsg />
                <Filters/>
                </div>
                </header>
        )


}
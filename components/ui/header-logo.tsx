import Link from "next/link";
import Image from "next/image";

export const HeaderLogo = () => {
        return(
                <Link href="/">
                        <div className="items-center hidden lg:flex">
                                <Image src="/logo.svg" alt="Logo" height={29} width={29}/>
                                <p className="font-semibold text-white text-2xl">
                                        Finance
                                </p>
                                
                        </div>
                </Link>
        );
}
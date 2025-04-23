import { Gift } from "lucide-react";
import Link from "next/link";

export default function Header(){
    return(
        <header className="boder-b">
            <div className="container mx-auto p-4">
                <div className="flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold flex items-center gap-2">
                        <Gift className="h-6 w-6 text-red-400"/>
                        <span>
                            Amigo
                            <span className="font-thin">
                                Secreto
                            </span>
                        </span>
                    </Link>
                </div>
            </div>
        </header>
    );
}
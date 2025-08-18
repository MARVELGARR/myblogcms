import Image from "next/image";
import { Navigation } from "./navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Header = ({className}: {className?: string}) => {
    return (
        <div className={cn(className,"w-full flex items-center justify-between")}>
            <div className="relative h-[6rem] w-[10rem]">

                <Image
                    src={"/images/logo.png"}
                    alt="logo"
                    fill
                />
            </div>

            <Navigation/>

            <Button className="">
                <a href=""> subscribe</a>
            </Button>
        </div>
    );
}
 
export default Header;
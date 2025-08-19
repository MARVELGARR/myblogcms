'use client'
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from 'next/navigation';

type navItemsprop = {
    label: string,
    link: string
}

const navItems = [ 
    {
        label: "Home",
        link: "/Application"
    },
    {
        label: "Blogs",
        link: "/Application/blogs"
    },
] as navItemsprop[]


type NavBarItemProp =  {
    className: string,
    label: string, 
    link: string
}

export const NavBarItem = ({
label, link, className
 }: NavBarItemProp) => {

    const pathname = usePathname()
    return (
        <Button asChild>
            <Link className={cn(className, pathname == link? "bg-background text-foreground rounded-xl" : "bg-secondary rounded-xl border-0  text-secondary-foreground")} href={link}>
            {label}</Link>
        </Button>
    );
}


export function Navigation(){

    return (
        <div className="flex gap-2 p-1 bg-secondary border-2 rounded-xl">
            {navItems.map((item)=>{
                return (
                    <NavBarItem key={item.link} className="" label={item.label}  link={item.link}/>
                )
            })}
        </div>
    )

}
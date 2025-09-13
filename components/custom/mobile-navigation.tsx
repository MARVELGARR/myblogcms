"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false)

  const mobileNav = [
    {
      link: "/Application/",
      name: "Home",
    },
    {
      link: "/Application/blogs",
      name: "Blogs",
    },
  ]

  return (
    <div className="sm:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="h-10 w-10" aria-label="Open navigation menu">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Menu</h2>
              
            </div>
            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                {mobileNav.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.link}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileNavigation

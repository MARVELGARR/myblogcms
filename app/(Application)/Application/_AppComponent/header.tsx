
import Image from "next/image";
import { Navigation } from "./navigation";
import { cn } from "@/lib/utils";
import MobileNavigation from "@/components/custom/mobile-navigation";
import SubscribeButton from "./subscribe-button";

const Header = ({ className }: { className?: string }) => {

  
  return (
    <div className={cn(
          className, 'flex items-center px-4')}>
        <MobileNavigation />
      <div
        className={
          "w-full flex items-center justify-center sm:justify-between px-5"
        }
      >
        <div className="relative h-[6rem] w-[10rem]">
          <Image src={"/images/logo.png"} alt="logo" fill />
        </div>
        <Navigation />

       <SubscribeButton/>
      </div>
    </div>
  );
};

export default Header;

import { prisma } from "@/prisma/prisma";
import Header from "./header";
import Image from "next/image";

// type MainFeaturedpageProp = {
//     blog?:stany
// }


const HomePage = async () => {
    
    // const featured = await prisma.post.findFirst({
    //     where: {
    //         featured: true
    //     },

    // })
    return (
        <div className="">
            {/* <div className="relative">

                <Image src={featured.image} alt={"featured post image"} fill/>
            </div> */}
            <Header className=" "/>

        </div>
    );
}
 
export default HomePage;
import { BlogCMSSidebar } from "@/components/blog-cms-sidebar";
import MyModalProviders from "@/providers/modal-provider";
import { ReactNode } from "react";

const AdminLayout = ({
    children
}: {children: ReactNode}) => {
    return (
        <div className="flex h-screen bg-background">
             <MyModalProviders/>
            <BlogCMSSidebar />
            <main className="flex-1 p-8">
                
           

            {children}
            </main>
        </div>
    );
}
 
export default AdminLayout;
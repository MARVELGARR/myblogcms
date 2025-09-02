import PostInformationDisplay from "@/components/AdminPostComponent/Post_info_component/post_information_display";
import { ReactNode } from "react";

const AdminAllPostLayout = ({children}: {children: ReactNode}) => {
    return (
        <div className="flex items-center h-full">
            <div className="flex-1">
            {children}
            </div>
            <PostInformationDisplay/>
        </div>
    );
}
 
export default AdminAllPostLayout;
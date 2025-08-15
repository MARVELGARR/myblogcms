import { ReactNode } from "react";

const AdminLayout = ({
    children
}: {children: ReactNode}) => {
    return (
        <div className="">{children}</div>
    );
}
 
export default AdminLayout;
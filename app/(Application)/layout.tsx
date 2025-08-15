import { ReactNode } from "react";

const ApplicationLayout = ({
    children
}: {children: ReactNode}) => {
    return (
        <div className="">{children}</div>
    );
}
 
export default ApplicationLayout;
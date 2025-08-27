import MyAlertProvider from "@/providers/alert-provider";
import MyModalProviders from "@/providers/modal-provider";
import { ReactNode } from "react";

const ApplicationLayout = ({
    children
}: {children: ReactNode}) => {
    return (
        <div className="">
            <MyModalProviders/>
            <MyAlertProvider/>
            {
            children}
            </div>
    );
}
 
export default ApplicationLayout;
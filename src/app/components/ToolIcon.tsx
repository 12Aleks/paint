import {FC, useState} from "react";
interface ToolIconProps {
    icon: string;
    onClick: () => void;
    isActive: boolean;
}
const ToolIcon: FC<ToolIconProps> = ({ icon, onClick ,  isActive }) => {

    return (
        <div onClick={onClick} className={isActive ? "active" : ""}>
            <i className={`bi ${icon}`}></i>
        </div>
    );
};

export default ToolIcon;
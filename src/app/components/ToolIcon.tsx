import {FC} from "react";
interface ToolIconProps {
    icon: string;
    onClick: () => void;
}
const ToolIcon: FC<ToolIconProps> = ({ icon, onClick }) => {
    return (
        <div onClick={onClick}>
            <i className={`bi ${icon}`}></i>
        </div>
    );
};

export default ToolIcon;
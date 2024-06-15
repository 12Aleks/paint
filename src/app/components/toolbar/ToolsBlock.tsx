"use client"

import ToolIcon from "./ToolIcon";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {updateCursorSize, updateMode} from "@/lib/features/cursorSlice";

const ToolsBlock = () => {
    const dispatch = useAppDispatch();
    const cursorData = useAppSelector(state => state.cursorData);
    const icons = ['bi-pencil-fill', 'bi-paint-bucket', 'bi-fonts', 'bi-eraser', 'bi-eyedropper', 'bi-zoom-in',
        // 'bi-superscript'
    ];

    const changeMode = (icon: string) => {
        dispatch(updateMode(icon))
        if(icon.includes('bi-pencil-fill')){
            dispatch(updateCursorSize(1))
        }else if(icon.includes('bi-eraser')){
            dispatch(updateCursorSize(8))
        }

    }

    return (
        <div className="tools_block d-inline-flex flex-column h-100 border-start border-2-secondary">
            <div className="wrapper">
                {icons.map((icon, index) =>
                    <ToolIcon key={icon} icon={icon} onClick={() => changeMode(icon)}
                              isActive={icon === cursorData.mode}/>
                )}
            </div>
            <p className="text-center mt-auto mb-0">Tools</p>
        </div>
    );
};

export default ToolsBlock;
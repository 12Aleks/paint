"use client"

import ToolIcon from "@/app/components/ToolIcon";
import {useAppDispatch} from "@/lib/hooks";
import {updateMode} from "@/lib/features/cursorSlice";

const ToolsBlock = () => {
    const dispatch = useAppDispatch();
    const icons = ['bi-pencil-fill', 'bi-paint-bucket', 'bi-fonts', 'bi-eraser', 'bi-eyedropper', 'bi-zoom-in',
        // 'bi-superscript'
    ];

    const changeMode = (icon: string) => {
        dispatch(updateMode(icon))
    }

    return (
        <div className="tools_block d-inline-flex flex-column h-100 border-start border-2-secondary">
            <div className="wrapper">
                {icons.map((icon, index) =>
                    <ToolIcon key={icon} icon={icon} onClick={() => changeMode(icon)} />
                )}
            </div>
            <p className="text-center mt-auto mb-0">Tools</p>
        </div>
    );
};

export default ToolsBlock;
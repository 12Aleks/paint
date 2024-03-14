import React from 'react';
import ColorBlock from "@/app/components/ColorBlock";
import ToolsBlock from "@/app/components/ToolsBlock";
import ImageBlock from "@/app/components/ImageBlock";
import SizeBlock from "@/app/components/SizeBlock";

const ControlPanel = () => {
    return (
        <div className="control_panel d-flex w-100 p-1">
            <ImageBlock/>
            <ToolsBlock/>
            <SizeBlock/>
            <ColorBlock/>
        </div>
    );
};

export default ControlPanel;
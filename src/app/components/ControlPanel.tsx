import React from 'react';
import ColorBlock from "@/app/components/ColorBlock";
import ToolsBlock from "@/app/components/ToolsBlock";
import ImageBlock from "@/app/components/ImageBlock";
import BrushBlock from "@/app/components/BrushBlock";
import SelectionBlock from "@/app/components/SelectionBlock";

const ControlPanel = () => {
    return (
        <div className="control_panel d-flex w-100 p-1">
            <SelectionBlock/>
            <ImageBlock/>
            <ToolsBlock/>
            <BrushBlock/>
            <ColorBlock/>
        </div>
    );
};

export default ControlPanel;
import React from 'react';
import ColorBlock from "@/app/components/ColorBlock";
import ToolsBlock from "@/app/components/ToolsBlock";

const ControlPanel = () => {
    return (
        <div className="control_panel d-flex w-100 p-1">
            <ToolsBlock/>
            <ColorBlock/>
        </div>
    );
};

export default ControlPanel;
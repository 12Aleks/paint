import ColorBlock from "./ColorBlock";
import ToolsBlock from "./ToolsBlock";
import ImageBlock from "./ImageBlock";
import BrushBlock from "./BrushBlock";
import SelectionBlock from "./SelectionBlock";

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